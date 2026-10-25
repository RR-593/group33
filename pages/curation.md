---
layout: page
title: Curation & Acknowledgements
nav_title: Curation
permalink: /curation/
---

{%- comment -%}
Curation & Acknowledgements page (first draft).
Styles live in _sass/curation.scss, scoped to .curation.
Replace the placeholder bio text, portrait, funder logos and licence links where
marked. Keep the heading order (page h1 -> section h2) and the image alt text.
{%- endcomment -%}

<div class="curation">

  <section class="curation__section" aria-labelledby="bio-heading">
    <h2 id="bio-heading" class="curation__heading curation__heading--start">Curator Bio</h2>
    <div class="curation__bio">
      <div class="curation__bio-text">
        <p>Placeholder biography. Replace this with the curator's bio — who they
        are, their background, and their role in the exhibition.</p>
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
        <!-- Replace src with the funder's logo and set alt to the funder's name. -->
        <img src="{{ '/assets/placeholders/placeholder-logo.svg' | relative_url }}"
             alt="Funding body logo (placeholder)" width="120" height="120">
      </li>
      <li class="curation__funder">
        <img src="{{ '/assets/placeholders/placeholder-logo.svg' | relative_url }}"
             alt="Funding body logo (placeholder)" width="120" height="120">
      </li>
      <li class="curation__funder">
        <img src="{{ '/assets/placeholders/placeholder-logo.svg' | relative_url }}"
             alt="Funding body logo (placeholder)" width="120" height="120">
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
