# Racó Tècnic website

Source of [racotecnic.com](https://racotecnic.com), built with
[Astro](https://astro.build) on top of the
[AstroPaper](https://github.com/satnaing/astro-paper) theme (v6.1.0).

Posts live in `src/content/posts/` as `YYYY-MM-DD-<slug>.md`. Each post is
served at `/YYYY/MM/<slug>/`, the URL of the old WordPress site (the slug is
the file name, percent-decoded). Uploaded images are in `public/uploads/`.

Requirements: Node.js 22.12+ and [pnpm](https://pnpm.io).

## Development

```bash
pnpm install
pnpm dev          # local server with hot reload
```

## Build and checks

```bash
pnpm build        # type checks, static build and search index (dist/)
pnpm test:urls    # checks every URL in tests/old-urls.txt exists in dist/
pnpm test:assets  # checks every root-relative src/href in dist/ resolves
pnpm lint
```

Site settings are in `astro-paper.config.ts`; old URLs that must redirect are
listed in `astro.config.ts` (`redirects`).

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub
Pages (source: GitHub Actions) on every push to `master`. `public/CNAME` sets
the custom domain.
