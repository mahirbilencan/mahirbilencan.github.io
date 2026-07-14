---
layout: page
permalink: /students/
title: Students
description: Doctoral and masters students, current and past.
nav: true
nav_order: 4
---

## Current students

<ul>
{% for student in site.data.students.current %}
  <li><strong>{{ student.name }}</strong>, {{ student.degree }} ({{ student.years }}){% if student.thesis %}: <em>{{ student.thesis }}</em>{% endif %}{% if student.note %}. {{ student.note }}{% endif %}</li>
{% endfor %}
</ul>

## Alumni

<ul>
{% for student in site.data.students.alumni %}
  <li><strong>{{ student.name }}</strong>, {{ student.degree }} ({{ student.years }}){% if student.thesis %}: <em>{{ student.thesis }}</em>{% endif %}{% if student.note %}. {{ student.note }}{% endif %}</li>
{% endfor %}
</ul>
