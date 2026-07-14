# mahirbilencan.github.io

Personal academic website of Mahir Bilen Can, built with [al-folio](https://github.com/alshedivat/al-folio) (Jekyll).

- Publications live in `_bibliography/papers.bib` (converted from the previous site by `scripts/md2bib.mjs`).
- Pages are in `_pages/`; site identity in `_config.yml` and `_data/socials.yml`.
- Local preview: `docker compose up`, then open `http://localhost:8080`.
- Deploys to GitHub Pages from the `gh-pages` branch via `.github/workflows/deploy.yml` on push to `main`.

The previous Astro site is preserved at the git tag `astro-site-final`.
