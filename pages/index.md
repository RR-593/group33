---
layout: default
title: "Disability Heritage: Archaeology with Difference"
nav_title: Home
permalink: /
subtitle: ""
# display photo behind the title; wording from docs/HannasMasterDoc.md, Home page > Display image
display_image:
  url: "assets/placeholders/Placeholder1_HomePageFullDisplay.jpeg"
  altText: "A photograph of the Disability Heritage: Archaeology with Difference display. There is a tall glass cabinet with three shelves and a panel to the left. The panel features the overview text, an iPad with this website, a QR code to this website and several tactile models of the objects in the glass case."
  caption: "Photograph (Placeholder) of the display at the Gale History Museum © Hannah Vogel and Gale History Museum"
video:
  src: ""
  poster: ""
  captions: ""
  transcript: "Transcript to be added."
---

<div class="exhibit">

  <section class="hero" aria-labelledby="hero-title">
    <span class="hero__lens hero__lens--start" aria-hidden="true"></span>
    <span class="hero__lens hero__lens--end" aria-hidden="true"></span>
    <h1 class="hero__title" id="hero-title">{{ page.title }}</h1>
    {% if page.subtitle and page.subtitle != "" %}<p class="hero__subtitle">{{ page.subtitle | escape }}</p>{% endif %}
    <a class="pill hero__scroll" href="#video">Scroll to continue {% include icon.html name="chevron-down" size=18 %}</a>
    {% assign d = page.display_image %}
    {% if d.url %}
      {% comment %} resized copies and blur placeholder from `rake images`, as on shelf pages {% endcomment %}
      {% assign ext = d.url | split: "." | last %}
      {% assign base_len = d.url.size | minus: ext.size | minus: 1 %}
      {% assign base = d.url | slice: 0, base_len | replace_first: "assets/", "assets/resized/" | relative_url | replace: " ", "%20" %}
      <figure class="hero__figure">
        <img class="hero__image" src="{{ base }}-{{ site.image_sizes | last }}.jpg"
             srcset="{% for w in site.image_sizes %}{{ base }}-{{ w }}.jpg {{ w }}w{% unless forloop.last %}, {% endunless %}{% endfor %}"
             sizes="(min-width: 500px) 100vw, 80vw"
             style="background-image: url('{{ site.data.lqip[d.url] }}')"
             alt="{{ d.altText | escape }}" fetchpriority="high">
        <figcaption class="hero__caption">{{ d.caption | escape }}</figcaption>
      </figure>
    {% endif %}
  </section>

  {% assign v = page.video %}
  <section class="video" id="video" aria-label="Auslan video introduction">
    <div class="video__inner">
      <div class="video__frame">
        {% if v.src and v.src != "" %}
          <video controls preload="metadata"{% if v.poster and v.poster != "" %} poster="{{ v.poster | relative_url }}"{% endif %}>
            <source src="{{ v.src | relative_url }}" type="video/mp4">
            {% if v.captions and v.captions != "" %}
              <track kind="captions" src="{{ v.captions | relative_url }}" srclang="en-AU" label="English captions" default>
            {% endif %}
            Your browser cannot play this video. Please read the transcript below.
          </video>
        {% else %}
          <div class="video__empty"><p>Auslan video to be added.</p></div>
        {% endif %}
      </div>
      <details class="video__transcript">
        <summary>Transcript</summary>
        <p>{{ v.transcript }}</p>
      </details>
    </div>
  </section>

  <section class="overview" id="overview" aria-label="Exhibition overview">
    <p>Disability is part of our history. However, archaeology is often ableist, overlooking, or worse, devaluing disabled experiences.</p>
    <p>This display invites you to think differently.</p>
    <p>If we place disability at the centre of our story, the object on the top shelf can represent the use of mobility aids, despite not usually being understood as disability representation. The middle shelf challenges the ideal of a bodily norm. It features a diversity of bodies, both human and divine, demonstrating difference across cultures and throughout time. The feeding vessels on the bottom shelf are evidence of community and care. These objects, created thousands of years apart, are products of differences in bodily experience within a community.</p>
    <p>This display is not only about disability, it is for the disability community. The accessibility 'features' are disability heritage just as much as the archaeological material behind the glass.</p>
  </section>

  <div class="exhibit__dark">
    <div class="exhibit__inner">

      <h2 class="exhibit__heading" id="display">Disability Throughout Time</h2>

      <div class="shelves">
        {% assign keys = "top,middle,bottom" | split: "," %}
        {% assign total = keys | size %}
        {% for key in keys %}
          {% assign shelf = site.data.shelves[key] %}
          {% assign shelf_url = '/shelves/' | append: key | append: '/' %}
          {% include shelf.html shelf=shelf number=forloop.index total=total url=shelf_url %}
        {% endfor %}
      </div>
    </div>
  </div>

</div>