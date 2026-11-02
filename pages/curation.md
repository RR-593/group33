---
layout: page
title: Curation & Acknowledgements
nav_title: Curation
permalink: /curation/
---

{%- comment -%}
Curation & Acknowledgements page (first draft).
Styles live in _sass/curation.scss, scoped to .curation.
Bio and funding text are copied word for word from docs/HannasMasterDoc.md
(About page > Curator, Funding); change them there first. Replace the placeholder
portrait and licence links where marked. Keep the heading order (page h1 ->
section h2) and the image alt text.
{%- endcomment -%}

<div class="curation">

  <section class="curation__section" aria-labelledby="bio-heading">
    <h2 id="bio-heading" class="curation__heading curation__heading--start">Curator Bio</h2>
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
      <figure class="curation__bio-figure">
        <!-- Replace src with the curator's photo. Then write alt text describing
             the person for its purpose here, e.g. alt="Dr Jane Doe, curator".
             Leave alt="" only while this remains a decorative placeholder. -->
        <img class="curation__portrait"
             src="{{ '/assets/placeholders/placeholder-portrait.svg' | relative_url }}"
             alt="" width="240" height="240">
      </figure>
    </div>
  </section>

  <section class="curation__section" aria-labelledby="funding-heading">
    <h2 id="funding-heading" class="curation__heading">Funding Bodies</h2>
    <ul class="curation__funders" role="list">
      <li class="curation__funder">
        <a class="curation__funder-name" href="https://www.ndrp.org.au/">National Disability Research Partnership</a>
        <span class="curation__funder-program">Disability Research Leadership Program (2026)</span>
      </li>
      <li class="curation__funder">
        <span class="curation__funder-name">Australian Government</span>
        <span class="curation__funder-program">Research Training Program Scholarship</span>
      </li>
    </ul>
    <p class="curation__funding-note">This exhibition is funded by the National Disability Research
    Partnership's Disability Research Leadership Program (2026). It is part of Hannah Vogel's PhD
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
    <div class="curation__table-wrap">
      <table class="curation__licenses">
        <caption class="curation__caption">Licences and credits for software and assets used on this site.</caption>
        <thead>
          <tr>
            <th scope="col">Asset</th>
            <th scope="col">Source</th>
            <th scope="col">Licence</th>
            <th scope="col">Licence URL</th>
            <th scope="col">Author / URL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Atkinson Hyperlegible</td>
            <td>Braille Institute</td>
            <td>SIL Open Font License</td>
            <!-- Add the licence and author links for this font. -->
            <td class="curation__todo">Link to be added</td>
            <td class="curation__todo">Link to be added</td>
          </tr>
          <tr>
            <td>Minima (site template)</td>
            <td>Joel Glovier &amp; contributors</td>
            <td>MIT License</td>
            <td><a href="https://github.com/jekyll/minima/tree/v2.5.2">github.com/jekyll/minima</a></td>
            <td class="curation__todo">Link to be added</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

</div>
