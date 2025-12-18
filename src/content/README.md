## Content Collections

This Astro site is set up so that lists (Publications, Talks, Teaching, Projects) come from Markdown files with frontmatter.

Add new entries under:
- `src/content/publications/`
- `src/content/talks/`
- `src/content/teaching/`
- `src/content/projects/`

### Publication example

Create `src/content/publications/my-paper.md`:

```md
---
title: "Title of the paper"
date: 2025-01-15
authors: "Eli Naig, Coauthor Name"
venue: "Journal / Conference / Preprint"
status: preprint
selected: true
links:
  pdf: "https://example.com/paper.pdf"
  arxiv: "https://arxiv.org/abs/xxxx.xxxxx"
  doi: "10.0000/example"
---

Optional: a short abstract or notes.
```

### Talk example

```md
---
title: "Talk title"
date: 2025-03-01
event: "Seminar name"
location: "City, ST"
kind: talk
links:
  slides: "https://example.com/slides.pdf"
---
```

