// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages: user/org pages serve at `/`, project pages serve at `/<repo>/`.
  // This derives a sane default when building in GitHub Actions, but still allows
  // local overrides via env vars if needed.
  site:
    process.env.ASTRO_SITE ??
    (process.env.GITHUB_REPOSITORY
      ? `https://${process.env.GITHUB_REPOSITORY.split('/')[0]}.github.io`
      : undefined),
  base: (() => {
    if (process.env.ASTRO_BASE) return process.env.ASTRO_BASE;

    const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
    const owner = process.env.GITHUB_REPOSITORY?.split('/')[0];
    if (!repo || !owner) return '/';

    const isUserOrOrgPages = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;
    return isUserOrOrgPages ? '/' : `/${repo}/`;
  })(),
  vite: {
    plugins: [tailwindcss()]
  }
});
