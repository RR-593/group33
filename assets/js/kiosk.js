// Gallery tablet mode: on a tablet left out for visitors, the site goes back to the home
// page once nobody has used it for a while, ready for the next person.
//
// Off on every device until someone opens the site with ?kiosk=on and confirms, so a
// visitor can't turn it on by accident; ?kiosk=off turns it off. The setting is kept in
// this browser only (localStorage). Timings come from `kiosk` in _config.yml.
//
// After the idle time a dialog warns and counts down, with a button to stay (WCAG 2.2.1).
// Playing audio counts as being used. Going back also resets the zoom level.

const root = document.documentElement;
// seconds from the page, or the defaults when missing or not a positive number (a server
// started before `kiosk` was added to _config.yml writes them empty, which would mean 0)
const seconds = (value, fallback) => (Number(value) > 0 ? Number(value) : fallback) * 1000;
const IDLE = seconds(root.dataset.kioskIdle, 120);
const WARNING = seconds(root.dataset.kioskWarning, 20);
const HOME = new URL(root.dataset.home, location.href).href;

const store = {
  get: () => { try { return localStorage.getItem('kiosk') === 'on'; } catch { return false; } },
  set: on => { try { on ? localStorage.setItem('kiosk', 'on') : localStorage.removeItem('kiosk'); } catch {} },
};

// ?kiosk=on / ?kiosk=off, then tidy the address so the setting isn't bookmarked or shared
const asked = new URLSearchParams(location.search).get('kiosk');
const wait = IDLE % 60000 ? `${IDLE / 1000} seconds` : `${IDLE / 60000} minute${IDLE === 60000 ? '' : 's'}`;
if (asked) {
  if (asked === 'off') {
    store.set(false);
    alert('Gallery tablet mode is off on this device.');
  } else if (asked === 'on' && store.get()) {
    alert(`Gallery tablet mode is already on on this device. To turn it off, open the site with ?kiosk=off.`);
  } else if (asked === 'on' && confirm(
    `Turn on gallery tablet mode on this device?\n\nAfter ${wait} with nobody using it, `
    + 'the site will go back to the home page. To turn it off, open the site with ?kiosk=off.')) {
    store.set(true);
  }
  const url = new URL(location.href);
  url.searchParams.delete('kiosk');
  history.replaceState(history.state, '', url);
}

if (store.get()) {
  // prerendered pages (see head.html) wait until they are actually shown
  if (document.prerendering) document.addEventListener('prerenderingchange', start, { once: true });
  else start();
}

function start() {
  let last = Date.now();
  let dialog, countdown;

  const zoomed = () => { try { return Boolean(localStorage.getItem('zoom')); } catch { return false; } };
  // nothing to reset: already the home page, at the top, at normal zoom
  const fresh = () => location.href.split('#')[0] === HOME && scrollY === 0 && !zoomed()
    && !document.querySelector('dialog[open], .site-nav.is-open');
  const busy = () => [...document.querySelectorAll('audio')].some(a => !a.paused);

  const goHome = () => {
    try { localStorage.removeItem('zoom'); } catch {}
    location.assign(HOME);
  };

  const warn = () => {
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.className = 'kiosk-warning';
      dialog.setAttribute('aria-labelledby', 'kiosk-title');
      dialog.setAttribute('aria-describedby', 'kiosk-text');
      dialog.innerHTML = `
        <h2 id="kiosk-title">Are you still there?</h2>
        <p id="kiosk-text">This page will go back to the start in <span class="kiosk-seconds"></span> seconds.</p>
        <button type="button" class="pill">I'm still here</button>`;
      dialog.querySelector('button').addEventListener('click', () => dialog.close());
      // closing it any way (button, Esc) counts as being here
      dialog.addEventListener('close', () => { last = Date.now(); });
      document.body.append(dialog);
      countdown = dialog.querySelector('.kiosk-seconds');
    }
    countdown.textContent = Math.ceil(WARNING / 1000);
    dialog.showModal();  // moves focus to the button, so Enter or a tap stays
  };

  // any touch, click, key or scroll is someone using the page; while the warning is open,
  // only closing it counts, so a stray tap behind it can't skip the warning
  for (const type of ['pointerdown', 'keydown', 'wheel', 'scroll']) {
    addEventListener(type, () => { if (!dialog?.open) last = Date.now(); }, { passive: true, capture: true });
  }
  addEventListener('pageshow', e => { if (e.persisted) last = Date.now(); });  // back button

  setInterval(() => {
    if (busy()) last = Date.now();
    const idle = Date.now() - last;
    if (idle < IDLE) return;
    if (fresh()) { last = Date.now(); return; }  // nothing to reset, so don't reload
    if (!dialog?.open) warn();
    const left = IDLE + WARNING - idle;
    countdown.textContent = Math.max(0, Math.ceil(left / 1000));
    if (left <= 0) goHome();
  }, 1000);
}
