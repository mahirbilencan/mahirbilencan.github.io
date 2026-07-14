---
layout: page
permalink: /teaching/
title: Teaching
description: Courses taught at Tulane University and elsewhere.
nav: true
nav_order: 3
---

{% for group in site.data.teaching %}

## {{ group.institution }}

<ul>
{% for course in group.courses %}
  <li>{{ course }}</li>
{% endfor %}
</ul>

{% endfor %}
