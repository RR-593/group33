---
layout: page
title: Curation & Acknowledgements
nav_title: Curation
permalink: /curation/
description: Who curated the exhibition, funded and developed it along with software license acknowledgements.
---

{%- comment -%}
Curation & Acknowledgements page (first draft).
Styles live in _sass/pages/_curation.scss, scoped to .curation.
Bio and funding text are copied word for word from docs/HannasMasterDoc.md
(About page > Curator, Funding); change them there first. Curator
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
        She has been recognised an emerging research leader of the inaugural National
        Disability Leadership Program by the National Disability Research Partnership.</p>
        <p>Check out her <a href="https://researchers.mq.edu.au/en/persons/hannah-vogel/">Macquaire
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

  <section class="curation__section" aria-labelledby="licenses-heading">
    <h2 id="licenses-heading" class="curation__heading">Software &amp; Asset Licenses &amp; Acknowledgements</h2>
    {% include license-table.html used_for="website" caption="On the website: sent to every visitor." %}
    {% include license-table.html used_for="building" caption="Building and checking the site: used by the team, not sent to visitors." %}
  </section>

</div>
