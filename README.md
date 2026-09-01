# Golden Pillar Services — Website

Bilingual (English / Arabic) marketing website for Golden Pillar Services, an
Omani fitout, joinery, signage and facility-cleaning contractor. Built with
[Astro](https://astro.build), statically generated, no client-side framework.

## Stack

- **Astro 7** — static site generation, file-based routing under `src/pages/[lang]/...`
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — utility CSS, design tokens defined in `src/styles/global.css` `@theme` block
- **TypeScript** — strict-typed content dictionaries (`src/i18n/`) and data files (`src/data/`)
- **Fonts**: Fraunces Variable (EN display), Inter Variable (EN body), IBM Plex Sans Arabic (all Arabic text) — via Fontsource, self-hosted, no external font requests
- **`@astrojs/sitemap`** — bilingual sitemap with hreflang alternates
- No client-side JS framework — the only site-authored JS is four small vanilla-TS modules in `src/scripts/` (scroll reveals, animated counters, timeline draw-in, projects filter/lightbox), each imported only on the pages that need it

Routing: every real page lives under `src/pages/[lang]/` and is built twice
(`/en/...` and `/ar/...`). `src/pages/index.astro` is a redirect-only page that
sends `/` to a locale (browser-language sniff, falling back to `/en/`).
`src/pages/404.astro` is a static, language-agnostic not-found page.

## Dev commands

```sh
pnpm install       # install dependencies
pnpm dev           # start local dev server at localhost:4321
pnpm build         # build the production site to ./dist/
pnpm preview       # serve the production build locally, for final checks
pnpm astro check   # type-check .astro files
```

## Design tokens

Defined in `src/styles/global.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--color-gold` | `#C9932B` | primary accent |
| `--color-gold-light` | `#E3B65A` | accent on dark backgrounds |
| `--color-charcoal` | `#2B2B2B` | header/footer, dark sections |
| `--color-ink` | `#1A1917` | primary text |
| `--color-ivory` | `#FAF7F0` | primary background |
| `--color-sand` | `#EFE7D8` | secondary background |
| `--color-stone` | `#8A8578` | decorative/non-text use only (fails AA at body-text sizes) |
| `--color-stone-dark` | `#6B6656` | body/caption text on ivory or sand — use this, not `stone`, for any text |

## Performance & accessibility

Final Lighthouse run (headless Chrome, `pnpm build && pnpm preview`, both
locales), artifacts saved to
`.superpowers/sdd/2026-09-01-golden-pillar-website/lighthouse-final-{en,ar}.json`:

| Category | `/en/` | `/ar/` |
| --- | --- | --- |
| Performance | 99 | 99 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Site-authored JS (`src/scripts/*.ts`, uncompressed source): `counters.ts`
2.2 KB, `projects.ts` 6.6 KB, `reveal.ts` 1.1 KB, `timeline.ts` 1.0 KB — total
~11 KB raw, well under the 20 KB-gzipped budget. Images are served as
AVIF/WebP via Astro's built-in `<Picture>` (see `ArchImage.astro`), generated
at build time from the source JPGs in `src/assets/img/`. Fonts are imported
as Fontsource **variable** packages (`@fontsource-variable/fraunces`,
`@fontsource-variable/inter`) plus the static `@fontsource/ibm-plex-sans-arabic`
package — no extra static weight files are pulled in beyond what each
package ships by default, and Fontsource's per-file `unicode-range` handles
subsetting automatically.

## Before launch — placeholder checklist

Everything below is placeholder or illustrative content put in place so the
site could be built and QA'd end to end. **All of it must be swapped for
real data before this site goes live.**

### `src/data/company.ts`

- `phone` / `whatsapp` / `whatsappLink` — real contact numbers (the WhatsApp
  link's digits must match `whatsapp`)
- `email` — real inbox address
- `crNumber` — real Commercial Registration number
- `address.en` / `address.ar` — real street address
- `mapEmbedUrl` — real Google Maps embed URL for the office location
- `hours.en` / `hours.ar` — confirmed real working hours
- `stats.years` / `stats.projects` / `stats.clients` — real counts (currently illustrative)
- `socials.instagram` / `.linkedin` / `.facebook` — real profile URLs (currently `#`)
- `nameEn` / `nameAr` — confirm these match the exact registered trading name

### `src/data/milestones.ts`

Five placeholder company-history milestones (2012–2024 founding story, first
major project, workshop opening, signage division, 100th project). Replace
with the client's confirmed company history and dates, or remove entries
that don't apply.

### `src/data/projects.ts`

Eight placeholder project entries (title, category, location) paired with
generic stock photography. Replace with real completed-project case studies
and real project photos once available.

### `astro.config.mjs`

`site: 'https://goldenpillar.om'` is a placeholder production domain — update
to the real domain before the first production build (this value feeds the
sitemap, canonical URLs, and OG/hreflang tags across every page).

### Photography

All current photography (`src/assets/img/*.jpg`, 22 files) is generic,
license-free stock sourced from Unsplash — see `src/assets/img/CREDITS.md`
for the full source list. No people, sites, or work shown are Golden Pillar's
own. Every image should be replaced with real company/project photography
before launch. If the OG image (`public/og-image.png`) or favicon
(`public/favicon.svg`, `public/favicon.ico`) need to change once a final
logo/brand asset is confirmed, regenerate the OG image with
`node scripts/generate-og-image.mjs`.

### Also worth a final look

- `public/robots.txt` currently allows all crawlers — confirm that's still
  desired at launch (e.g. no staging/preview URL should ship with the same
  file).
- JSON-LD `LocalBusiness` schema in `src/layouts/Base.astro` is built
  directly from `company.ts`, so fixing the placeholders above also fixes
  the structured data automatically — no separate edit needed there.
