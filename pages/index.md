---
layout: default
title: Disability Throughout Time
permalink: /
---

<div class="exhibit">

  <section class="hero" aria-labelledby="hero-title">
    <h1 class="hero__title" id="hero-title">Disability Throughout Time</h1>
    <a class="pill" href="#overview">Scroll to continue <span aria-hidden="true">&#8964;</span></a>
  </section>

  <section class="overview" id="overview" aria-label="Exhibition overview">
    <p>Exhibition overview text to be added.</p>
  </section>

  <div class="exhibit__dark">
    <div class="exhibit__inner">
      <nav class="crumbs" aria-label="Breadcrumb">
        <a href="#">Exhibition</a>
        <span aria-hidden="true">&bull;</span>
        <span aria-current="page">Display</span>
      </nav>

      <h2 class="exhibit__heading">Disability Throughout Time</h2>

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