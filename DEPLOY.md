## Deploying the Astro Site to GitHub Pages

This repo uses Astro (at the repository root). The old Jekyll site has been archived under `archive/legacy-jekyll/`.

When you’re ready to switch, the cleanest approach is to deploy `dist` to GitHub Pages via GitHub Actions.

### Recommended setup

1. In GitHub, go to **Settings → Pages**
2. Set **Build and deployment** to **GitHub Actions**
3. Add a workflow at `.github/workflows/deploy.yml` that:
   - checks out the repo
   - installs Node
   - runs `npm ci`
   - runs `npm run build`
   - deploys `dist`

If your repo is `username.github.io`, you typically do not need a `base` setting.
If you deploy to a project subpath (e.g. `username.github.io/my-site/`), you’ll need to set `base` in `astro.config.mjs`.

### Local verification

From the repository root:
- `npm run build`
- `npm run preview`
