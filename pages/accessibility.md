---
layout: page
eyebrow: Visiting  # small label above the title
title: Accessibility
permalink: /accessibility/
description: How accessibility was incorporated into the website.
---

{%- comment -%}
Accessibility page, built from the Figma design. The website section is copied word
for word from docs/HannasMasterDoc.md (About page > Visitor information); change it there first.
Styles live in _sass/pages/_accessibility.scss, scoped to .accessibility.
The on-campus visitor details (location, hours) are marked to be confirmed.
{%- endcomment -%}

<div class="accessibility">

  <section class="accessibility__section" aria-labelledby="web-heading">
    <h2 id="web-heading" class="accessibility__heading">Accessibility &ndash; Website</h2>
    <p>This website has considered accessibility throughout its development.
    Targeted testing has ensured access to this exhibition site with a range of
    devices, browsers and assistive technologies. It aims to meet the Web Content
    Accessibility Guidelines (WCAG) 2.2 at Level AA.</p>

    <p>Several features support accessibility, including the Atkinson Hyperlegible
    typeface, created by the Braille Institute to be easier to read for people with
    low vision. It includes a simple, high-contrast colour scheme of dark text on a
    light background with a single clear link colour and sans-serif typefaces. The
    layout is consistent across pages with a scaled heading structure and a single
    reading order that reflows to fit desktop, tablet and mobile screens, without
    text breaking or overlapping.</p>

    <p>All links, the Menu, and the 3D object viewers can be operated via the
    keyboard with a visible highlight on selected sections. Testing and use by
    screen readers have been enabled through ordered headings, landmarks and
    meaningful descriptions on all assets. Other features include audio-visual
    descriptions paired with captions and a full transcript, 3D models of the
    objects can be rotated and zoomed from the keyboard. In case a model fails to
    load a still image and description is available. The site will also respect your
    device’s reduced-motion and high-contrast settings.</p>
  </section>

  {%- comment -%}
    Not from the master doc: written by the website team after screen reader testing
    (VoiceOver, November 2026; NVDA, 18 November 2026). The key lists under each card are
    hidden from screen readers, so this section is where screen reader users find them.
    Keep it in step with _includes/header.html, _includes/artifact-card.html and _layouts/shelf.html.
  {%- endcomment %}
  <section class="accessibility__section" aria-labelledby="keys-heading">
    <h2 id="keys-heading" class="accessibility__heading">Keyboard and screen readers</h2>
    <p>Everything on this website works with the Tab, Shift+Tab, Enter and Space keys.
    Each object on a shelf page is a single Tab stop. Its buttons (previous and next
    photo, enlarge photo, audio description and View in 3D, plus captions, speed and
    volume once the audio player is open) sit inside it and
    can be reached by reading through the object with a screen reader, then pressed with
    Enter or Space, or with a double tap on a touch screen.</p>

    <p>Shortcut keys give a quicker route for keyboard users. Screen readers such as NVDA,
    JAWS and VoiceOver use many of the same keys for their own navigation, so a shortcut
    may move the screen reader instead of reaching the website. With NVDA, press
    <kbd>NVDA</kbd>+<kbd>F2</kbd> and then the shortcut key to pass it to the website.
    Other screen readers have a similar pass-through command. The buttons above always
    work without shortcuts.</p>

    <h3>Main menu (while it has keyboard focus)</h3>
    <ul>
      <li><kbd>←</kbd> <kbd>→</kbd>: move between pages in the menu</li>
      <li><kbd>1</kbd> to <kbd>{{ site.header_pages.size | at_most: 9 }}</kbd>: go straight to a page</li>
      <li><kbd>-</kbd> <kbd>+</kbd>: zoom the page out or in</li>
    </ul>

    <h3>Anywhere on a page</h3>
    <ul>
      <li><kbd>Shift</kbd>+<kbd>↑</kbd>: back to the top of the page and the main menu</li>
    </ul>

    <h3>An object on a shelf page (while it has keyboard focus)</h3>
    <ul>
      <li><kbd>←</kbd> <kbd>→</kbd>: previous or next photo</li>
      <li><kbd>Z</kbd>: enlarge the photo</li>
      <li><kbd>T</kbd>: show or hide the description text</li>
      <li><kbd>D</kbd>: open the 3D model, where there is one</li>
      <li><kbd>Enter</kbd>: play or pause the audio description</li>
    </ul>

    <h3>Audio description player (while it is open)</h3>
    <ul>
      <li><kbd>↑</kbd> <kbd>↓</kbd>: volume</li>
      <li><kbd>J</kbd> <kbd>L</kbd>: back or forward 10 seconds</li>
      <li><kbd>M</kbd>: mute</li>
      <li><kbd>S</kbd>: playback speed</li>
      <li><kbd>Esc</kbd>: close the player</li>
    </ul>

    <h3>Enlarged photo</h3>
    <ul>
      <li><kbd>←</kbd> <kbd>→</kbd>: previous or next photo (move around when zoomed in)</li>
      <li><kbd>+</kbd> <kbd>-</kbd>: zoom in or out; <kbd>0</kbd>: fit to the screen</li>
      <li><kbd>Esc</kbd>: close</li>
    </ul>
  </section>

  <section class="accessibility__section" aria-labelledby="campus-heading">
    <h2 id="campus-heading" class="accessibility__heading">Accessibility &ndash; On-Campus</h2>
    <p>The exhibition is also on display in person at the <a href="https://www.mq.edu.au/faculty-of-arts/about/gale-history-museum">Gale History Museum</a>,
    Macquarie University, and the physical display has been designed with access
    in mind. Alongside the objects in the case there are tactile models that can
    be touched, together with large-print and braille guides produced with Vision
    Australia, and a panel carrying the overview text, a tablet showing this
    website and a QR code that links to it.</p>

    <p>Visitor information for the on-campus display &mdash; its location, opening
    hours and how to get there &mdash; will be added here closer to the exhibition.
    If you have specific access requirements for an in-person visit, please get in
    touch in advance so we can make arrangements.</p>
  </section>

</div>
