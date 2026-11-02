// Runs on every page (a module, linked in _includes/head.html): the nav pill, page zoom and
// section buttons. Their markup is in _includes/header.html and section-steps.html.

// Nav pill: one Tab stop; arrows, Home and End move between links, and number keys
// open a link, only while focus is in the pill (WCAG 2.1.4)
const nav = document.querySelector('.site-nav');
const links = [...nav.querySelectorAll('a')];
// one Tab stop: the current page's link, or the first; without JavaScript every link is a Tab stop
const start = nav.querySelector('[aria-current]') || links[0];
const rove = a => links.forEach(l => l.tabIndex = l === a ? 0 : -1);
rove(start);
// phones: the pill scrolls sideways, so bring the current page's link into view
start.scrollIntoView({ block: 'nearest', inline: 'center' });

// Phones (under 760px, set in _header.scss): the links fold into a list under the Menu
// button. Esc, a click outside, or leaving the page closes it
const toggle = nav.querySelector('.nav-toggle');
toggle.hidden = false;
nav.classList.add('has-menu');
const openMenu = on => {
  toggle.setAttribute('aria-expanded', on);
  nav.classList.toggle('is-open', on);
};
const menuOpen = () => nav.classList.contains('is-open');
toggle.addEventListener('click', () => openMenu(!menuOpen()));
document.addEventListener('click', e => nav.contains(e.target) || openMenu(false));
addEventListener('pageshow', () => openMenu(false));  // back button restores the page as it was left
// Tab out of the open list closes it, so it never covers what has focus. relatedTarget is
// null for clicks in Safari, which the click handler above covers
nav.addEventListener('focusout', e => e.relatedTarget && !nav.contains(e.relatedTarget) && openMenu(false));
// where focus goes for Shift+Up and back to top: the Menu button while the list is folded away
const navFocus = () => (toggle.offsetParent && !menuOpen() ? toggle : nav.querySelector('a[tabindex="0"]'));

nav.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;  // keep browser shortcuts and Shift+Up
  if (e.key === 'Escape' && menuOpen()) {
    openMenu(false);
    toggle.focus();
    return e.preventDefault();
  }
  const i = links.indexOf(e.target), n = links.length;
  // left/right along the pill; up/down along the phone menu's list
  const to = i < 0 ? undefined : { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: n - 1 }[e.key];
  const jump = nav.querySelector(`a[aria-keyshortcuts="${e.key}"]`);
  if (to !== undefined) {
    const a = links[(to + n) % n];  // wraps around at either end
    rove(a);
    a.focus();
  } else if (jump) jump.click();
  else return;
  e.preventDefault();
});

// Shift+Up from anywhere does what the back to top button does: top of the page, focus on
// the nav pill (the current page's link)
document.addEventListener('keydown', e => {
  if (!e.shiftKey || e.key !== 'ArrowUp' || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.target.closest('input, textarea, select, [contenteditable], dialog')) return;  // Shift+Up selects text there; dialogs have their own keys
  goToTop();
  e.preventDefault();
});

// Page zoom: scales the whole page (CSS zoom), remembered across pages in localStorage
// and applied before first paint by the inline script in head.html
const zoom = document.querySelector('.zoom');
const steps = [0.8, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2];
const stored = () => {
  let i = -1;
  try { i = steps.indexOf(Number(localStorage.getItem('zoom'))); } catch {}
  return i < 0 ? steps.indexOf(1) : i;
};
let level = stored();
const show = () => {
  document.documentElement.style.zoom = steps[level] === 1 ? '' : steps[level];
  zoom.querySelector('output').value = Math.round(steps[level] * 100) + '%';
  // aria-disabled, not disabled, so focus stays on the button at either end
  zoom.querySelectorAll('button').forEach(b => b.setAttribute('aria-disabled', !steps[level + Number(b.dataset.step)]));
};
show();
const step = n => {
  if (!steps[level + n]) return;
  level += n;
  show();
  try { localStorage.setItem('zoom', steps[level]); } catch {}
};
zoom.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (b) step(Number(b.dataset.step));
});

// = is + without Shift. Anywhere on the page, but not while typing
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;  // keep the browser's own Ctrl/Cmd zoom
  if (e.target.closest('input:not([type="range"]), textarea, select, [contenteditable], dialog')) return;  // the photo viewer zooms the photo instead
  const n = { '-': -1, '+': 1, '=': 1 }[e.key];
  if (!n) return;
  step(n);
  e.preventDefault();
});
// prerendered or back/forward-cached pages may have been made before the last change
const sync = () => { level = stored(); show(); };
document.addEventListener('prerenderingchange', sync);
addEventListener('pageshow', e => e.persisted && sync());

// Section buttons: top, previous section and next section, bottom right. The sections are
// the page's main headings plus anything marked data-step (a heading inside one of those
// doesn't count twice). Each button is named after where it goes, and that name shows
// beside it on hover or focus. Stepping moves focus to the section, so screen readers and
// the next Tab continue from there
const stepBar = document.querySelector('.steps');
const [topButton, prevButton, nextButton] = ['.steps__top', '.steps__prev', '.steps__next'].map(s => stepBar.querySelector(s));
const stepLabel = stepBar.querySelector('.steps__label');
const calm = matchMedia('(prefers-reduced-motion: reduce)');
const sections = [...document.querySelectorAll('main h1, main h2, main [data-step]')]
  .filter(el => !el.closest('dialog') && (el.matches('[data-step]') || !el.parentElement.closest('[data-step]')));

// a section's name: its heading, without hidden parts such as the "01" section numbers
const nameOf = el => {
  const heading = el.matches('h1, h2, h3') ? el : el.querySelector('h1, h2, h3');
  const copy = heading.cloneNode(true);
  copy.querySelectorAll('[aria-hidden="true"], .visually-hidden').forEach(n => n.remove());
  return copy.textContent.trim().replace(/\s+/g, ' ');
};

// where a section lands after scrolling to it: just below the sticky header
const landing = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 80;
const atEnd = () => scrollY + innerHeight >= document.documentElement.scrollHeight - 2;
const previous = () => sections.findLast(el => el.getBoundingClientRect().top < landing() - 8);
// at the very top, a section already in the top part of the screen (the page title) is
// where you are, not where Next should go
const next = () => {
  if (atEnd()) return null;
  const after = Math.max(landing() + 8, scrollY < 1 ? innerHeight * 0.4 : 0);
  return sections.find(el => el.getBoundingClientRect().top > after);
};

const label = (button, prefix, target) => {
  button.setAttribute('aria-disabled', !target);
  button.setAttribute('aria-label', target ? `${prefix} section: ${nameOf(target)}` : `No ${prefix.toLowerCase()} section`);
  button.dataset.hint = target ? `${prefix}: ${nameOf(target)}` : '';
};
const updateSteps = () => {
  topButton.classList.toggle('is-shown', scrollY > innerHeight * 0.75);
  label(prevButton, 'Previous', previous());
  label(nextButton, 'Next', next());
};

const goTo = el => {
  el.scrollIntoView({ block: 'start', behavior: calm.matches ? 'auto' : 'smooth' });
  if (!el.matches('a, button, [tabindex]')) el.tabIndex = -1;
  el.focus({ preventScroll: true });
};

function goToTop() {
  scrollTo({ top: 0, behavior: calm.matches ? 'auto' : 'smooth' });
  navFocus().focus({ preventScroll: true });
}

if (sections.length > 1) {
  stepBar.hidden = false;
  let queued = false;
  addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; updateSteps(); });
  }, { passive: true });
  addEventListener('resize', updateSteps);
  updateSteps();

  topButton.addEventListener('click', goToTop);
  prevButton.addEventListener('click', () => { const el = previous(); if (el) goTo(el); });
  nextButton.addEventListener('click', () => { const el = next(); if (el) goTo(el); });

  // the destination beside the button under the pointer or keyboard focus
  const hint = e => {
    const button = e.target.closest('.steps__button');
    stepLabel.textContent = button?.dataset.hint ?? '';
    if (button) stepLabel.style.top = `${button.offsetTop + button.offsetHeight / 2}px`;
  };
  const unhint = () => { if (!stepBar.matches(':hover, :focus-within')) stepLabel.textContent = ''; };
  stepBar.addEventListener('pointerover', hint);
  stepBar.addEventListener('focusin', hint);
  stepBar.addEventListener('pointerleave', unhint);
  stepBar.addEventListener('focusout', () => requestAnimationFrame(unhint));
  addEventListener('scroll', () => { if (stepLabel.textContent) stepLabel.textContent = ''; }, { passive: true });
}
