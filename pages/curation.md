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
portrait where marked. Licences: add a row when the site gains a font, library,
icon set or tool; NOTICE.md holds the full terms for what ships. Keep the heading order (page h1 ->
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
    <table class="curation__licenses">
      <caption class="curation__caption">On the website: sent to every visitor.</caption>
      <thead>
        <tr>
          <th scope="col">Asset</th>
          <th scope="col">Licence</th>
          <th scope="col">Author</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Atkinson Hyperlegible (site font)</td>
          <td><a href="https://openfontlicense.org/open-font-license-official-text/">SIL Open Font License 1.1</a></td>
          <td><a href="https://www.brailleinstitute.org/freefont/">Braille Institute of America, files from Fontsource v5.3.0</a></td>
        </tr>
        <tr>
          <td>Minima 2.5.2 (site template)</td>
          <td><a href="https://github.com/jekyll/minima/blob/v2.5.2/LICENSE.txt">MIT License</a></td>
          <td><a href="https://github.com/jekyll/minima">Joel Glovier &amp; contributors</a></td>
        </tr>
        <tr>
          <td>Lucide 0.469.0 icons (buttons and controls)</td>
          <td><a href="https://lucide.dev/license">ISC License</a></td>
          <td><a href="https://lucide.dev">Lucide Contributors; portions Cole Bemis (Feather)</a></td>
        </tr>
        <tr>
          <td>Swiper 11.2.10 (image carousels)</td>
          <td><a href="https://github.com/nolimits4web/swiper/blob/master/LICENSE">MIT License</a></td>
          <td><a href="https://swiperjs.com">Vladimir Kharlampidi</a></td>
        </tr>
      </tbody>
    </table>
    <table class="curation__licenses">
      <caption class="curation__caption">Building and checking the site: used by the team, not sent to visitors.</caption>
      <thead>
        <tr>
          <th scope="col">Asset</th>
          <th scope="col">Licence</th>
          <th scope="col">Author</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Jekyll 4.4.1 with jekyll-feed and jekyll-seo-tag (site builder, news feed, page metadata)</td>
          <td><a href="https://github.com/jekyll/jekyll/blob/master/LICENSE">MIT License</a> (same for both plugins)</td>
          <td><a href="https://jekyllrb.com">Jekyll contributors</a></td>
        </tr>
        <tr>
          <td>Rake 13 (project tasks)</td>
          <td><a href="https://github.com/ruby/rake/blob/master/MIT-LICENSE">MIT License</a></td>
          <td><a href="https://github.com/ruby/rake">Jim Weirich &amp; Ruby contributors</a></td>
        </tr>
        <tr>
          <td>ImageMagick (resized photos)</td>
          <td><a href="https://imagemagick.org/license/">ImageMagick License</a></td>
          <td><a href="https://imagemagick.org">ImageMagick Studio LLC</a></td>
        </tr>
        <tr>
          <td>axe-core 4.14.0 (WCAG check)</td>
          <td><a href="https://github.com/dequelabs/axe-core/blob/develop/LICENSE">Mozilla Public License 2.0</a></td>
          <td><a href="https://www.deque.com/axe/">Deque Systems</a></td>
        </tr>
        <tr>
          <td>Puppeteer 25.13.0 (browser for the WCAG check)</td>
          <td><a href="https://github.com/puppeteer/puppeteer/blob/main/LICENSE">Apache License 2.0</a></td>
          <td><a href="https://pptr.dev">Google LLC</a></td>
        </tr>
        <tr>
          <td>Lighthouse (site audits)</td>
          <td><a href="https://github.com/GoogleChrome/lighthouse/blob/main/LICENSE">Apache License 2.0</a></td>
          <td><a href="https://github.com/GoogleChrome/lighthouse">Google LLC</a></td>
        </tr>
        <tr>
          <td>lighthouse-check-action 12.0.1 (runs Lighthouse)</td>
          <td><a href="https://github.com/foo-software/lighthouse-check-action/blob/master/LICENSE">MIT License</a></td>
          <td><a href="https://github.com/foo-software/lighthouse-check-action">Foo (foo-software)</a></td>
        </tr>
        <tr>
          <td>lighthouse-check-status-action 3.0.1 (Lighthouse pass marks)</td>
          <td><a href="https://github.com/foo-software/lighthouse-check-status-action/blob/master/package.json">ISC License</a> (stated in package.json; no licence file)</td>
          <td><a href="https://github.com/foo-software/lighthouse-check-status-action">Foo (foo-software)</a></td>
        </tr>
        <tr>
          <td>check-jsonschema 0.38.2 (shelf data check)</td>
          <td><a href="https://github.com/python-jsonschema/check-jsonschema/blob/main/LICENSE">Apache License 2.0</a></td>
          <td><a href="https://github.com/python-jsonschema/check-jsonschema">Stephen Rosen</a></td>
        </tr>
        <tr>
          <td>GitHub Actions: checkout, setup-node, upload-artifact, configure-pages, upload-pages-artifact, deploy-pages</td>
          <td><a href="https://github.com/actions/checkout/blob/main/LICENSE">MIT License</a></td>
          <td><a href="https://github.com/actions">GitHub, Inc.</a></td>
        </tr>
        <tr>
          <td>setup-ruby (GitHub Action)</td>
          <td><a href="https://github.com/ruby/setup-ruby/blob/master/LICENSE">MIT License</a></td>
          <td><a href="https://github.com/ruby/setup-ruby">Ruby contributors</a></td>
        </tr>
      </tbody>
    </table>
  </section>

</div>
