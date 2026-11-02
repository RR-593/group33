// Runs on every page (a module, linked in _includes/head.html): the nav pill, page zoom and
// back to top button. Their markup is in _includes/header.html and back-to-top.html.

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
  if (e.target.closest('input, textarea, select, [contenteditable]')) return;  // Shift+Up selects text there
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
  if (e.target.closest('input:not([type="range"]), textarea, select, [contenteditable]')) return;
  const n = { '-': -1, '+': 1, '=': 1 }[e.key];
  if (!n) return;
  step(n);
  e.preventDefault();
});
// prerendered or back/forward-cached pages may have been made before the last change
const sync = () => { level = stored(); show(); };
document.addEventListener('prerenderingchange', sync);
addEventListener('pageshow', e => e.persisted && sync());

// Back to top: shown once the page is scrolled down about a screen. Scrolls up and moves
// focus to the nav pill, so keyboard and screen reader users land there too
const backToTop = document.querySelector('.back-to-top');
const calm = matchMedia('(prefers-reduced-motion: reduce)');
const showBackToTop = () => backToTop.classList.toggle('is-shown', scrollY > innerHeight * 0.75);
addEventListener('scroll', showBackToTop, { passive: true });
showBackToTop();
backToTop.addEventListener('click', goToTop);

function goToTop() {
  scrollTo({ top: 0, behavior: calm.matches ? 'auto' : 'smooth' });
  navFocus().focus({ preventScroll: true });
}
