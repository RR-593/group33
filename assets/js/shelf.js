// Shelf pages (_layouts/shelf.html): the 3D model pop-up, the photo viewer, each card's
// photo carousel, audio description player, captions toggle and shortcut keys. Card markup is in
// _includes/artifact-card.html. Swiper is loaded before this in _includes/head.html.

// native <dialog>: traps focus, closes on Esc and hands focus back to the card
const dialog = document.querySelector('.model-dialog');
const frame = dialog.querySelector('iframe');
const loading = dialog.querySelector('.model-dialog-loading');
// Nira is another site, so `load` means its page is up, not that the model has
// finished streaming; Nira shows its own progress from there
frame.addEventListener('load', () => loading.textContent = '');
document.querySelectorAll('.artifact-3d').forEach(button => button.addEventListener('click', () => {
  dialog.querySelector('h2').textContent = button.dataset.title;
  frame.title = button.dataset.title;
  // the last model stays loaded after closing (browsers throttle hidden frames),
  // so reopening it is instant; a different model hides the old one behind the spinner
  if (frame.src !== button.dataset.src) {
    loading.textContent = 'Loading 3D model…';
    frame.src = button.dataset.src;
  }
  dialog.showModal();
}));
dialog.querySelector('.model-dialog-close').addEventListener('click', () => dialog.close());

// one audio description at a time
document.addEventListener('play', e => document.querySelectorAll('audio')
  .forEach(a => a !== e.target && a.pause()), true);

// The card's "Audio description" button grows into its player bar and plays; the bar's
// controls skip Tab like the rest of the card, with keys listed under the photo while it's open.
// Returns null when the object has no recording.
const audioPlayer = card => {
  const audio = card.querySelector('audio');
  if (!audio) return null;
  const bar = card.querySelector('.artifact-audio');
  const play = bar.querySelector('.artifact-play');
  const keyList = card.querySelector('.artifact-audio-keys');
  const seek = bar.querySelector('.player-seek');
  const volumeBtn = bar.querySelector('.player-volume-btn');
  const volumePop = bar.querySelector('.player-volume-pop');
  const volume = bar.querySelector('.player-volume-slider');
  const time = bar.querySelector('.player-time');
  audio.controls = false;
  audio.hidden = true;
  bar.hidden = false;

  const clock = s => Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00';
  const isOpen = () => bar.classList.contains('is-open');
  // the pill slides out sideways from the button's width to the full row (and back);
  // with reduced motion it just switches
  const calm = matchMedia('(prefers-reduced-motion: reduce)');
  const showVolume = on => {
    volumePop.hidden = !on;
    volumeBtn.setAttribute('aria-expanded', on);
  };
  const open = on => {
    if (!on) { audio.pause(); showVolume(false); }
    if (isOpen() === on) return;
    const from = `${bar.offsetWidth}px`;
    bar.classList.toggle('is-open', on);
    keyList.hidden = !on;
    if (calm.matches) return;
    // open: to the row's full width; close: to the button's own width. Controls are
    // clipped only while it moves, so the volume pop-up can hang below the bar after
    const to = on ? '100%' : `${bar.offsetWidth}px`;
    bar.style.overflow = 'hidden';
    bar.animate({ width: [from, to] }, { duration: 350, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' })
      .finished.finally(() => bar.style.overflow = '');
  };
  const playPause = () => {
    open(true);
    audio.paused ? audio.play() : audio.pause();
  };
  const skip = s => audio.currentTime = Math.min(Math.max(audio.currentTime + s, 0), audio.duration || 0);
  const setVolume = v => {
    audio.volume = Math.min(Math.max(v, 0), 1);
    audio.muted = false;
  };
  const louder = v => setVolume(Math.round(((audio.muted ? 0 : audio.volume) + v) * 10) / 10);

  const showTime = () => {
    seek.max = audio.duration || 0;
    seek.value = audio.currentTime;
    seek.style.setProperty('--p', `${audio.duration ? audio.currentTime / audio.duration * 100 : 0}%`);
    time.textContent = `${clock(audio.currentTime)} / ${clock(audio.duration)}`;
    seek.setAttribute('aria-valuetext', `${clock(audio.currentTime)} of ${clock(audio.duration)}`);
  };
  const showPlaying = () => {
    play.classList.toggle('is-playing', !audio.paused);
    play.setAttribute('aria-label', `${audio.paused ? 'Play' : 'Pause'} audio description`);
  };
  audio.addEventListener('timeupdate', showTime);
  audio.addEventListener('loadedmetadata', showTime);
  audio.addEventListener('play', showPlaying);
  audio.addEventListener('pause', showPlaying);
  // muted, or turned all the way down, both show the muted speaker
  audio.addEventListener('volumechange', () => {
    const level = audio.muted ? 0 : audio.volume;
    volume.value = level;
    volume.style.setProperty('--p', `${level * 100}%`);
    volumeBtn.classList.toggle('is-muted', level === 0);
    volumeBtn.setAttribute('aria-label', `Volume ${level === 0 ? 'muted' : `${Math.round(level * 100)}%`}`);
  });
  seek.addEventListener('input', () => audio.currentTime = seek.value);
  volume.addEventListener('input', () => setVolume(Number(volume.value)));
  play.addEventListener('click', playPause);
  volumeBtn.addEventListener('click', () => showVolume(volumePop.hidden));
  bar.querySelector('.player-close').addEventListener('click', () => open(false));
  document.addEventListener('click', e => volumePop.hidden || volumeBtn.parentElement.contains(e.target) || showVolume(false));

  return {
    playPause, isOpen,
    keys: { arrowup: () => louder(0.1), arrowdown: () => louder(-0.1), j: () => skip(-10), l: () => skip(10), m: () => audio.muted = !audio.muted, escape: () => open(false) },
  };
};

// Photo viewer: one shared dialog (in _layouts/shelf.html) showing a card's photos large.
// Zoom with pinch, double-tap or double-click, the wheel, the +/- buttons or keys; drag
// to look around a zoomed photo; swipe, the arrows or ←/→ for the other photos. Zooming in
// swaps to the original photo for detail. Closing returns to the card on the same photo.
const viewer = document.querySelector('.photo-viewer');
const stage = viewer.querySelector('.photo-viewer__stage');
const shown = viewer.querySelector('.photo-viewer__image');
const caption = viewer.querySelector('.photo-viewer__caption');
const count = viewer.querySelector('.photo-viewer__count');
const [prevPhoto, nextPhoto] = ['.photo-viewer__prev', '.photo-viewer__next'].map(s => viewer.querySelector(s));
const MAX_ZOOM = 5;
let photos = [], current = 0, openedFrom = null;
let zoom = 1, x = 0, y = 0;

// keep a zoomed photo's edges from moving inside the stage
const clamp = () => {
  const room = (size, frame) => Math.max(0, (size * zoom - frame) / 2);
  const mx = room(shown.offsetWidth, stage.clientWidth), my = room(shown.offsetHeight, stage.clientHeight);
  x = Math.min(mx, Math.max(-mx, x));
  y = Math.min(my, Math.max(-my, y));
};
const draw = () => {
  clamp();
  shown.style.transform = `translate(${x}px, ${y}px) scale(${zoom})`;
  stage.classList.toggle('is-zoomed', zoom > 1);
  viewer.querySelector('[data-zoom="-1"]').setAttribute('aria-disabled', zoom <= 1);
  viewer.querySelector('[data-zoom="1"]').setAttribute('aria-disabled', zoom >= MAX_ZOOM);
  // past fit size, the resized copy runs out of detail: load the original once
  const full = photos[current]?.full;
  if (zoom > 1 && full && shown.dataset.full !== full) {
    shown.dataset.full = full;
    shown.removeAttribute('srcset');
    shown.src = full;
  }
};
// zoom to `to`, keeping the point under (cx, cy) in place; the stage centre by default
const zoomTo = (to, cx, cy) => {
  const box = stage.getBoundingClientRect();
  const px = (cx ?? box.left + box.width / 2) - (box.left + box.width / 2);
  const py = (cy ?? box.top + box.height / 2) - (box.top + box.height / 2);
  const next = Math.min(MAX_ZOOM, Math.max(1, to));
  x = px - (px - x) * (next / zoom);
  y = py - (py - y) * (next / zoom);
  zoom = next;
  if (zoom === 1) x = y = 0;
  draw();
};

const showPhoto = i => {
  current = (i + photos.length) % photos.length;
  const photo = photos[current];
  zoom = 1; x = y = 0;
  delete shown.dataset.full;
  shown.srcset = photo.srcset;
  shown.sizes = '100vw';
  shown.src = photo.src;
  shown.alt = photo.alt;
  caption.textContent = photo.caption;
  count.textContent = photos.length > 1 ? `Photo ${current + 1} of ${photos.length}` : '';
  draw();
};
const step = n => { if (photos.length > 1) showPhoto(current + n); };

const openViewer = (card, index) => {
  photos = [...card.querySelectorAll('.swiper-slide')].map(slide => {
    const img = slide.querySelector('img');
    return { src: img.currentSrc || img.src, srcset: img.srcset, full: img.dataset.full, alt: img.alt, caption: slide.querySelector('figcaption')?.textContent ?? '' };
  });
  openedFrom = card;
  viewer.querySelector('.photo-viewer__title').textContent = card.querySelector('h2').textContent;
  viewer.classList.toggle('has-one', photos.length < 2);
  showPhoto(index);
  viewer.showModal();
};

viewer.addEventListener('close', () => {
  openedFrom?.querySelector('.swiper')?.swiper?.slideTo(current, 0);
  openedFrom?.focus();
  openedFrom = null;
});
viewer.querySelector('.photo-viewer__close').addEventListener('click', () => viewer.close());
// a click on the dark area around the photo closes, like the 3D pop-up's backdrop
viewer.addEventListener('click', e => { if (e.target === viewer) viewer.close(); });
prevPhoto.addEventListener('click', () => step(-1));
nextPhoto.addEventListener('click', () => step(1));
viewer.querySelectorAll('[data-zoom]').forEach(b => b.addEventListener('click', () => zoomTo(zoom * (Number(b.dataset.zoom) > 0 ? 1.5 : 1 / 1.5))));

viewer.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;  // keep the browser's own zoom
  const act = { ArrowLeft: () => step(-1), ArrowRight: () => step(1), '+': () => zoomTo(zoom * 1.5), '=': () => zoomTo(zoom * 1.5), '-': () => zoomTo(zoom / 1.5), '0': () => zoomTo(1) }[e.key];
  if (!act) return;
  act();
  e.preventDefault();
});

stage.addEventListener('wheel', e => {
  e.preventDefault();
  zoomTo(zoom * Math.exp(-e.deltaY * 0.002), e.clientX, e.clientY);
}, { passive: false });

// Touch and mouse: one pointer drags (or swipes, at fit size), two pinch
const pointers = new Map();
let start = null, lastTap = 0;
const spread = () => { const [a, b] = [...pointers.values()]; return Math.hypot(a.x - b.x, a.y - b.y); };
const middle = () => { const [a, b] = [...pointers.values()]; return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }; };

stage.addEventListener('pointerdown', e => {
  if (e.target.closest('button')) return;
  try { stage.setPointerCapture(e.pointerId); } catch {}  // keeps the drag going outside the stage
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  stage.classList.add('is-moving');
  start = pointers.size === 2
    ? { pinch: spread(), zoom }
    : { x: e.clientX, y: e.clientY, ox: x, oy: y, time: Date.now() };
});
stage.addEventListener('pointermove', e => {
  if (!pointers.has(e.pointerId)) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pointers.size === 2 && start?.pinch) {
    const m = middle();
    zoomTo(start.zoom * spread() / start.pinch, m.x, m.y);
  } else if (pointers.size === 1 && start && !start.pinch && zoom > 1) {
    x = start.ox + e.clientX - start.x;
    y = start.oy + e.clientY - start.y;
    draw();
  }
});
const lift = e => {
  if (!pointers.has(e.pointerId)) return;
  pointers.delete(e.pointerId);
  if (pointers.size) { start = null; return; }  // one finger still down after a pinch
  stage.classList.remove('is-moving');
  if (start && !start.pinch) {
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    const quick = Date.now() - start.time < 300;
    if (zoom === 1 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);  // swipe
    else if (quick && Math.hypot(dx, dy) < 10) {
      // a double tap or double click zooms in on that point, or back out
      if (Date.now() - lastTap < 300) { zoomTo(zoom > 1 ? 1 : 2.5, e.clientX, e.clientY); lastTap = 0; }
      else lastTap = Date.now();
    }
  }
  start = null;
};
stage.addEventListener('pointerup', lift);
stage.addEventListener('pointercancel', lift);
addEventListener('resize', () => { if (viewer.open) draw(); });

document.querySelectorAll('.artifact').forEach(card => {
  const el = card.querySelector('.artifact-images.swiper');
  const swiper = new Swiper(el, {
    // each carousel gets its own dots and arrows, so they don't control each other;
    // dots aren't clickable so Swiper doesn't make them Tab stops
    pagination: { el: el.querySelector('.swiper-pagination') },
    navigation: { nextEl: el.querySelector('.swiper-button-next'), prevEl: el.querySelector('.swiper-button-prev') },
    // a11y module is on by default in the bundle: labels the arrows and announces slides
  });
  // Swiper's a11y module makes its arrow buttons Tab stops on start and again whenever
  // the carousel reaches or leaves an end; the card is the only Tab stop, so undo it each time
  const skipArrows = () => el.querySelectorAll('.swiper-button-prev, .swiper-button-next')
    .forEach(b => b.tabIndex = -1);
  skipArrows();
  swiper.on('fromEdge toEdge lock unlock', skipArrows);

  // the photo viewer: a tap or click on a photo (not a drag), the Enlarge button, or key Z
  swiper.on('click', (s, e) => { if (e.target.closest('img')) openViewer(card, s.clickedIndex ?? s.activeIndex); });
  card.querySelector('.artifact-enlarge').addEventListener('click', () => openViewer(card, swiper.activeIndex));

  const button3d = card.querySelector('.artifact-3d');
  const player = audioPlayer(card);

  // captions button (or Read description, with no recording) swaps the metadata list for the description text
  const toggle = card.querySelector('.artifact-transcript-toggle');
  const meta = card.querySelector('dl');
  const transcript = card.querySelector('.artifact-transcript');
  const showTranscript = on => {
    toggle.setAttribute('aria-pressed', on);
    meta.hidden = on;
    transcript.hidden = !on;
  };
  toggle.hidden = false;
  showTranscript(false);
  toggle.addEventListener('click', () => showTranscript(transcript.hidden));

  // shortcuts work only while the card itself has focus (WCAG 2.1.4)
  card.addEventListener('keydown', e => {
    if (e.target !== card || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;  // keep browser shortcuts and Shift+Up (to the nav)
    const key = e.key.toLowerCase();
    if (key === 'arrowleft') swiper.slidePrev();
    else if (key === 'arrowright') swiper.slideNext();
    else if (key === 'enter' && player) player.playPause();
    else if (key === 't') toggle.click();
    else if (key === 'z') openViewer(card, swiper.activeIndex);
    else if (key === 'd' && button3d) button3d.click();
    // player keys only while it's open; otherwise ↑/↓ scroll and Esc does nothing here
    else if (player?.isOpen() && key in player.keys) player.keys[key]();
    else return;
    e.preventDefault();
  });
});
