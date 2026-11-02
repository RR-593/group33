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

  <section class="accessibility__section" aria-labelledby="campus-heading">
    <h2 id="campus-heading" class="accessibility__heading">Accessibility &ndash; On-Campus</h2>
    <p>The exhibition is also on display in person at the Gale History Museum,
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
