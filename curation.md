---
layout: page
title: Curation & Acknowledgements
permalink: /curation/
---

{%- comment -%}
Curation & Acknowledgements page (first draft).
Self-contained: this page and /assets/curation.css only. It adds no navigation
and edits no shared files, so it can be merged on its own.
Bio and funder text are from the sponsor's master document. The curator photo
and funder logos are still placeholders — replace the images in /assets/curation/
and update each image's alt text when the real files are supplied.
{%- endcomment -%}

<link rel="stylesheet" href="{{ '/assets/curation.css' | relative_url }}">

<div class="curation">

  <section class="curation__section" aria-labelledby="bio-heading">
    <h2 id="bio-heading" class="curation__heading curation__heading--start">Curator</h2>
    <div class="curation__bio">
      <div class="curation__bio-text">
        <p>Hannah Vogel is an archaeologist researching ableism and disability, and
        an advocate for accessibility with experience in museums, outreach and
        inclusive pedagogies. She is a teaching academic and PhD candidate in the
        School of Humanities at Macquarie University, and was named an emerging
        leader of disability by the National Disability Research Partnership.</p>
      </div>
      <figure class="curation__bio-figure">
        <!-- Placeholder: the curator's profile photo is still to come. When it
             is supplied, replace this src and set alt to describe her, e.g.
             alt="Hannah Vogel, curator". Keep alt="" only while it is a placeholder. -->
        <img class="curation__portrait"
             src="{{ '/assets/curation/placeholder-portrait.svg' | relative_url }}"
             alt="" width="240" height="240">
      </figure>
    </div>
  </section>

  <section class="curation__section" aria-labelledby="funding-heading">
    <h2 id="funding-heading" class="curation__heading">Funding Bodies</h2>
    <p class="curation__funding-intro">This exhibition is funded by the National
    Disability Research Partnership’s Disability Research Leadership Program (2026).
    It is part of Hannah Vogel’s PhD project, supported by the Commonwealth through
    an Australian Government Research Training Program Scholarship.</p>
    <ul class="curation__funders" role="list">
      <li class="curation__funder">
        <!-- Placeholder logo — replace src with the funder's logo when supplied. -->
        <img src="{{ '/assets/curation/placeholder-logo.svg' | relative_url }}"
             alt="National Disability Research Partnership logo (placeholder)"
             width="120" height="120">
        <span class="curation__funder-name">National Disability Research Partnership</span>
      </li>
      <li class="curation__funder">
        <img src="{{ '/assets/curation/placeholder-logo.svg' | relative_url }}"
             alt="Australian Government logo (placeholder)"
             width="120" height="120">
        <span class="curation__funder-name">Australian Government — Research Training Program</span>
      </li>
    </ul>
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
