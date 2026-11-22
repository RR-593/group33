---
layout: page
eyebrow: About the exhibition  # small label above the title
title: Curation & Acknowledgements
nav_title: Curation
permalink: /curation/
description: Who curated the exhibition, funded and developed it along with software license acknowledgements.
---

{%- comment -%}
Curation & Acknowledgements page (first draft).
Styles live in _sass/pages/_curation.scss, scoped to .curation.
Bio, funding and acknowledgements text are copied word for word from docs/HannasMasterDoc.md
(About page > Curator, Funding, Acknowledgements); change them there first. Curator
portrait: _data/bio_pic.yml. Licence tables: one file per row in _data/licenses/ (rules in
_data/schemas/license.schema.yml); add one when the site gains a font, library,
icon set or tool. NOTICE.md holds the full terms for what ships. Keep the heading order (page h1 ->
section h2) and the image alt text.
{%- endcomment -%}

<div class="curation">

  <section class="curation__section" aria-labelledby="bio-heading">
    <h2 id="bio-heading" class="curation__heading">Curator Bio</h2>
    <div class="curation__bio">
      <div class="curation__bio-text">
        <p>Hannah Vogel is an archaeologist, teaching academic, and PhD candidate researcher
        in the School of Humanities, Macquarie University (Sydney, Australia). As a leading
        researcher on ableism and disability, she combines archaeological scholarship with
        advocacy and experience in museums, public outreach, accessibility, and inclusive
        pedagogies. Her work has helped shape the emerging field of archaeological
        disability studies.</p>
        <p>Her recent books include <cite>Disability in Ancient Egypt and Egyptology</cite>
        (Routledge, 2024) and <cite>Disability Activism in and Out of the Academy</cite> (2026).
        She has been recognised as an emerging research leader of the inaugural National
        Disability Leadership Program by the National Disability Research Partnership.</p>
        <p>Check out her <a href="https://researchers.mq.edu.au/en/persons/hannah-vogel/">Macquarie
        University Profile</a> or <a href="https://hvogel.org/">Website (hvogel.org)</a> for
        more information about her projects, research, outreach and advocacy.</p>
      </div>
      {%- comment -%} photo, alt text and caption: _data/bio_pic.yml {%- endcomment %}
      {%- assign bio_pic = site.data.bio_pic %}
      <figure class="curation__bio-figure">
        {% include responsive-image.html src=bio_pic.url alt=bio_pic.altText class="curation__portrait" sizes="(max-width: 600px) 200px, 240px" eager=true %}
        <figcaption class="curation__portrait-caption">{{ bio_pic.caption | escape }}</figcaption>
      </figure>
    </div>
  </section>

  <section class="curation__section" aria-labelledby="funding-heading">
    <h2 id="funding-heading" class="curation__heading">Funding Bodies</h2>
    <p>This exhibition is funded by the <a href="https://www.ndrp.org.au/">National Disability Research
    Partnership</a>'s Disability Research Leadership Program (2026). It is part of Hannah Vogel's PhD
    project supported by the Commonwealth through an Australian Government Research Training
    Program Scholarship DOI: <a href="https://doi.org/10.82133/C42F-K220">https://doi.org/10.82133/C42F-K220</a>.</p>
  </section>

  <section class="curation__section" aria-labelledby="team-heading">
    <h2 id="team-heading" class="curation__heading">Web Developer Team</h2>
    <dl class="curation__team">
      <div class="curation__team-item">
        <dt>Team Lead / Dev Ops</dt>
        <dd>Raphael Munoz</dd>
      </div>
      <div class="curation__team-item">
        <dt>Website Programmer</dt>
        <dd>Tanmay Jagdale</dd>
      </div>
      <div class="curation__team-item">
        <dt>Website Programmer</dt>
        <dd>Alec Scappa</dd>
      </div>
      <div class="curation__team-item">
        <dt>Documentation Editor / Test Lead</dt>
        <dd>Chelsey Acosta</dd>
      </div>
      <div class="curation__team-item">
        <dt>Website Programmer</dt>
        <dd>Mitch Davis</dd>
      </div>
      <div class="curation__team-item">
        <dt>UI Lead</dt>
        <dd>Fardiz Khan</dd>
      </div>
    </dl>
  </section>

  <section class="curation__section" aria-labelledby="thanks-heading">
    <h2 id="thanks-heading" class="curation__heading">Acknowledgements</h2>
    <p>This research was undertaken on the lands of the Wallumattagal clan of the Dharug
    Nation, whose cultures and customs have nurtured and continue to nurture this land,
    since the Dreaming. Their sovereignty was never ceded.</p>
    <p>Thanks to the <a href="https://www.mq.edu.au/faculty-of-arts/about/gale-history-museum">Gale History Museum</a>, Macquarie University for providing access to the materials for
    this exhibition, with special thanks to Leila Wallace, Dr Yvonne Inall and Sarah Judd.
    Thanks also to:</p>
    <ul>
      <li>Dr Brian Ballsun-Stanton (website accessibility, development and support)</li>
      <li>Mike Baber (3D models and prints)</li>
      <li>Dave Frame (Signage and installation)</li>
      <li>Vision Australia (Tactile fabrication, large-print and braille guides)</li>
      <li>Marcus Arruzza (Video production and digital scans)</li>
    </ul>
    <p>I acknowledge [disability] community consultation, was provided by the National
    Disability Research Partnership staff (especially, Catherine Raffaele and Jess
    Rosenthal), and the Disability Research Leaders Community of Practice members
    (especially, Matthew Jackson and Samantha Lilly). Acknowledgments for feedback and
    consultation also from Dr Alexandra F. Morris, Amy Cripps, Cecily Bateman, Chaya Kasif,
    Damian Gilbert, Dr David Chapman, Dr Ewan Coopey, Gessika Crowe, Hannah Newman, Jackie
    Tang, Dr Julia Hamilton, Dr Katie Shead, Dr Louise Pryke, Marianne Strauss, Dr Narges
    Safari, Nicole Leong, Penelope Blake, Prof Ronika Power, Sarah Massingham, Taylah Evans
    and many other community members who have elected to remain anonymous.</p>
    <p>Special thanks to Hannah Newman and Dr Brian Ballsun-Stanton for their work
    supporting the administrative and technical development of this exhibition and
    associated website.</p>
    <p>In most instances, I have chosen to use identity-first disability language as a
    personal preference. I acknowledge that preferences vary amongst the diverse disability
    community and respect the choices of each person to express their experiences and
    embodiments.</p>
  </section>

  <section class="curation__section" aria-labelledby="licenses-heading">
    <h2 id="licenses-heading" class="curation__heading">Software &amp; Asset Licenses &amp; Acknowledgements</h2>
    {% include license-table.html used_for="website" caption="On the website: sent to every visitor." %}
    {% include license-table.html used_for="building" caption="Building and checking the site: used by the team, not sent to visitors." %}
  </section>

</div>
