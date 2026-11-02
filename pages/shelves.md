---
layout: page
title: Shelves
permalink: /shelves/
description: Artifacts that represented on each shelf 
---
{% for key in site.shelves -%}
{%- assign shelf_page = site.pages | where: "shelf", key | first %}
- [{{ shelf_page.title }}]({{ shelf_page.url | relative_url }})
{%- endfor %}
