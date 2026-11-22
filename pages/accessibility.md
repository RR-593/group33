---
layout: page
eyebrow: Visiting  # small label above the title
title: Accessibility
permalink: /accessibility/
description: How accessibility was incorporated into the website.
---

{%- comment -%}
Accessibility page, built from the Figma design. The Website and On-Campus sections are
copied word for word from docs/HannasMasterDoc.md (About page > Visitor information and
accessibility); change them there first.
Styles live in _sass/pages/_accessibility.scss, scoped to .accessibility.
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
    <h2 id="campus-heading" class="accessibility__heading">Accessibility - On-Campus</h2>
    <p>This exhibition is displayed at the <a href="https://www.mq.edu.au/faculty-of-arts/about/gale-history-museum">Gale History Museum</a> from 10th November 2026 until
    the 1st of March 2027. The Museum is open 10am to 4pm, Monday to Friday (closed on
    public holidays) and is located on Macquarie University's Wallumattagal Campus, North
    Ryde, on the ground floor of the Arts Precinct at 25C Wally's Walk. Please refer to
    P-12 on the <a href="https://www.mq.edu.au/__data/assets/pdf_file/0016/108142/Campus-Map.pdf">Campus Map</a>. Parking and public transport information can be accessed via
    Museum&rsquo;s <a href="https://www.mq.edu.au/faculty-of-arts/about/gale-history-museum/visit">Visit page</a> on the Macquarie University Website.</p>

    <p>Accessibility features for the on-campus display include:</p>
    <ul>
      <li>Tactile 3D printed models of the objects</li>
      <li>Tactile 3D printed fabrication of the scene depicted on Object 1, Pelike (MU4759)</li>
      <li>Braille and Large-print guide</li>
      <li>An interactive touchscreen and QR codes to access this website including an Auslan
      (Australian Sign Language) interpretation video and high-quality photographs with
      audio-visual descriptions.</li>
    </ul>
  </section>

</div>
