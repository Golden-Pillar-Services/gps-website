# Golden Pillar Services Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Production-ready bilingual (EN/AR, full RTL) static marketing website for Golden Pillar Services (Omani fitout/construction, cleaning, joinery, signage company).

**Architecture:** Astro static site, Tailwind CSS v4, per-language routes `/en/...` + `/ar/...` sharing templates fed by typed dictionaries. Vanilla TS islands for motion (blur scroll-reveals, counters, timeline). All company facts centralized in one data file for later swap.

**Tech Stack:** Astro ≥ 5, Tailwind v4 (`@tailwindcss/vite`), Fontsource (Fraunces, Inter, IBM Plex Sans Arabic), TypeScript, pnpm.

**Spec:** `docs/superpowers/specs/2026-09-01-golden-pillar-website-design.md`

## Global Constraints

- Palette tokens exactly: gold `#C9932B`, gold-light `#E3B65A`, charcoal `#2B2B2B`, ink `#1A1917`, ivory `#FAF7F0`, sand `#EFE7D8`, stone `#8A8578`. Gold never used as large fill.
- Fonts self-hosted via Fontsource only — zero external font/CDN requests.
- No React, no GSAP, no icon packs. Custom SVG only.
- All CSS uses logical properties (`ms-`/`me-`/`ps-`/`pe-` Tailwind utilities, `inline-start/end`) — never physical left/right for layout that must mirror in RTL.
- Every page exists in both languages; Arabic pages carry `lang="ar" dir="rtl"`; `hreflang` alternates on every page.
- All motion wrapped in `@media (prefers-reduced-motion: no-preference)` or JS matchMedia guard.
- Arabic copy: Modern Standard Arabic, Gulf business register. English: confident, concrete, no marketing fluff ("we deliver X" not "we are passionate about excellence").
- Placeholder company facts live ONLY in `src/data/company.ts` and are marked `// PLACEHOLDER — swap with real value`.
- Verification per task: `pnpm build` must pass; visual checks via `pnpm dev`.
- Commit after every task with Conventional Commits format.

---

### Task 1: Project scaffold + design tokens + fonts

**Files:**
- Create: Astro project in repo root (`package.json`, `astro.config.mjs`, `tsconfig.json`, `src/styles/global.css`, `.gitignore`)
- Move: `Golden Pillar Logo FULL-12.svg` → `src/assets/logo-full.svg`, `Golden Pillar Logo SQUARE_vv.svg` → `src/assets/logo-square.svg`

**Interfaces:**
- Produces: Tailwind theme tokens `gold, gold-light, charcoal, ink, ivory, sand, stone`; font families `font-display` (Fraunces), `font-sans` (Inter), `font-arabic` (IBM Plex Sans Arabic); CSS vars usable everywhere.

- [ ] **Step 1: Scaffold Astro**

```bash
pnpm create astro@latest . --template minimal --no-git --install --typescript strict
pnpm add -D @tailwindcss/vite tailwindcss
pnpm add @fontsource-variable/fraunces @fontsource-variable/inter @fontsource/ibm-plex-sans-arabic
```

(If create-astro refuses non-empty dir, scaffold in temp dir and move files in, preserving `.git/`, `docs/`, logo SVGs.)

- [ ] **Step 2: Configure Astro + Tailwind v4**

`astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://goldenpillar.om', // PLACEHOLDER domain
  vite: { plugins: [tailwindcss()] },
});
```

`src/styles/global.css`:
```css
@import 'tailwindcss';

@theme {
  --color-gold: #C9932B;
  --color-gold-light: #E3B65A;
  --color-charcoal: #2B2B2B;
  --color-ink: #1A1917;
  --color-ivory: #FAF7F0;
  --color-sand: #EFE7D8;
  --color-stone: #8A8578;

  --font-display: 'Fraunces Variable', Georgia, serif;
  --font-sans: 'Inter Variable', system-ui, sans-serif;
  --font-arabic: 'IBM Plex Sans Arabic', 'Segoe UI', Tahoma, sans-serif;
}

html { scroll-behavior: smooth; }
body { background: var(--color-ivory); color: var(--color-ink); }

/* Arabic pages: swap font stack wholesale */
[dir='rtl'] body, [dir='rtl'] .font-display, [dir='rtl'] .font-sans {
  font-family: var(--font-arabic);
}
```

- [ ] **Step 3: Verify build**

Run: `pnpm build`
Expected: builds with zero errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: scaffold Astro + Tailwind v4 with brand tokens and self-hosted fonts"
```

---

### Task 2: i18n core + company data

**Files:**
- Create: `src/i18n/index.ts`, `src/i18n/en.ts`, `src/i18n/ar.ts`, `src/data/company.ts`, `src/data/services.ts`

**Interfaces:**
- Produces:
  - `type Lang = 'en' | 'ar'`
  - `t(lang: Lang): Dict` — returns full typed dictionary
  - `localePath(lang: Lang, path: string): string` — `localePath('ar','/about') → '/ar/about'`
  - `altPath(lang: Lang, currentPath: string): string` — same page, other language (for switcher)
  - `dirFor(lang: Lang): 'ltr' | 'rtl'`
  - `company` object: `{ nameEn, nameAr, phone, whatsapp, whatsappLink, email, crNumber, address: {en, ar}, mapEmbedUrl, hours: {en, ar}, stats: {years, projects, clients}, socials }` — every value `// PLACEHOLDER` marked
  - `services` array: `{ slug, icon, title: {en, ar}, tagline: {en, ar}, scope: {en: string[], ar: string[]}, process: {en, ar}[4], heroImage }[]` for the 4 services with slugs `fitout-construction`, `cleaning-services`, `joinery`, `signage`

- [ ] **Step 1: Write `src/i18n/index.ts`**

```ts
export type Lang = 'en' | 'ar';
export const langs: Lang[] = ['en', 'ar'];
export const dirFor = (l: Lang) => (l === 'ar' ? 'rtl' : 'ltr');
export const localePath = (l: Lang, p: string) => `/${l}${p === '/' ? '/' : p}`;
export const altPath = (l: Lang, current: string) => {
  const other = l === 'en' ? 'ar' : 'en';
  return current.replace(/^\/(en|ar)/, `/${other}`);
};
export { en } from './en';
export { ar } from './ar';
import { en } from './en';
import { ar } from './ar';
export const t = (l: Lang) => (l === 'ar' ? ar : en);
export type Dict = typeof en;
```

- [ ] **Step 2: Author dictionaries**

`en.ts` / `ar.ts` mirror shape. Include at minimum: `nav` (home/services/about/projects/contact), `cta` (getQuote/whatsapp/viewAll/learnMore/startProject), `home` (heroTitle, heroSub, servicesTitle, whyTitle, whyPoints[3], statsLabels, featuredTitle, ctaBand), `footer`, `contact`, `about`, `projects`, `notFound`. Key copy locked here:

- EN hero: `heroTitle: "Built on Precision.\nFinished with Pride."`, `heroSub: "Fitout, joinery, signage and facility services for Oman's most demanding spaces — delivered on time, to specification."`
- AR hero: `heroTitle: "نبني بدقة.\nوننجز بفخر."`, `heroSub: "خدمات التشطيبات والنجارة واللوحات الإعلانية وإدارة المرافق لأرقى المشاريع في سلطنة عُمان — بجودة عالية والتزام بالمواعيد."`
- AR must be reviewed sentence-by-sentence for Gulf business register — no literal calques from English.

- [ ] **Step 3: Author `company.ts` and `services.ts`** with the interface shapes above; scope lists from spec §7 (fitout: commercial/retail/office/F&B fitout, renovation, MEP coordination; cleaning: deep, facade/external, post-construction, scheduled commercial; joinery: doors, wardrobes, kitchens, custom furniture, commercial millwork; signage: 3D letters, lightbox, wayfinding, vehicle branding, installation) — each in both languages.

- [ ] **Step 4: Verify** `pnpm build` (type errors surface here). Expected: pass.

- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: i18n core, bilingual dictionaries, centralized company data"`

---

### Task 3: Base layout, header, footer, language switcher, WhatsApp float

**Files:**
- Create: `src/layouts/Base.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/LangSwitch.astro`, `src/components/WhatsAppFloat.astro`, `src/components/PillarDivider.astro`, `src/pages/index.astro` (root redirect)

**Interfaces:**
- Consumes: `t, Lang, dirFor, localePath, altPath, company` from Task 2.
- Produces: `Base.astro` props `{ lang: Lang; title: string; description: string; currentPath: string }` — renders `<html lang dir>`, meta, hreflang alternates, OG tags, header/footer/float, `<slot/>`. All pages use it.

- [ ] **Step 1: Build `Base.astro`** — head with title/description, `<link rel="alternate" hreflang>` pair + `x-default`, OG tags, canonical, favicon from logo-square, global.css + font imports.
- [ ] **Step 2: Header** — sticky, translucent charcoal over hero (backdrop-blur), logo (full logo SVG inlined, gold/ivory variant for dark header), nav from dict, `LangSwitch` (renders `عربي` on EN pages, `EN` on AR pages, links to `altPath`), mobile menu (details/popover pattern, no framework).
- [ ] **Step 3: Footer** — charcoal, 4 columns (brand+blurb, services links, quick links, contact block w/ phone/email/address from `company`), CR number line, hairline gold top rule, copyright.
- [ ] **Step 4: WhatsAppFloat** — fixed bottom, `inset-inline-end`, links `company.whatsappLink`, custom SVG WhatsApp glyph, gentle pulse ring (reduced-motion guarded), `aria-label` per language.
- [ ] **Step 5: Root `index.astro`** — static page with inline script: `location.replace(navigator.language.startsWith('ar') ? '/ar/' : '/en/')` + `<noscript><meta http-equiv="refresh" content="0;url=/en/"></noscript>` fallback + link.
- [ ] **Step 6: PillarDivider** — small SVG section divider using pillar strokes from logo geometry, gold on transparent.
- [ ] **Step 7: Temporary smoke pages** `src/pages/[lang]/index.astro` with `getStaticPaths` for en/ar rendering Base + placeholder heading. Run `pnpm build`, then `pnpm dev`: verify EN page LTR, AR page RTL with Arabic font, switcher round-trips, float visible.
- [ ] **Step 8: Commit** `git add -A && git commit -m "feat: base layout, header/footer, language switcher, WhatsApp float"`

---

### Task 4: Motion system (blur reveals, counters) + shared UI atoms

**Files:**
- Create: `src/scripts/reveal.ts`, `src/scripts/counters.ts`, `src/components/Reveal.astro` (wrapper), `src/components/Button.astro`, `src/components/SectionHeading.astro`, `src/components/Stat.astro`

**Interfaces:**
- Produces:
  - Markup contract: any element with `data-reveal` (optional `data-reveal-delay="1..6"` stagger step ×80ms) animates opacity 0→1, translateY 24px→0, **blur 8px→0**, 700ms cubic-bezier(0.22,1,0.36,1), once, at 20% visibility.
  - `data-counter="1240"` elements count 0→value over 1.6s on first visibility (Intl.NumberFormat per lang, Eastern Arabic numerals NOT used — Gulf business convention keeps Western digits; format with `ar-OM` locale default which yields Western digits).
  - `Button.astro` props `{ href, variant: 'gold' | 'outline' | 'ghost-light' }` — gold bg/charcoal text, gold underline-sweep hover on ghost.
  - `SectionHeading.astro` props `{ eyebrow?, title, sub? }` — gold hairline + eyebrow uppercase tracking, Fraunces title.

- [ ] **Step 1: `reveal.ts`**

```ts
const mq = matchMedia('(prefers-reduced-motion: reduce)');
export function initReveals() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (mq.matches) { els.forEach(e => e.classList.add('revealed')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) if (en.isIntersecting) {
      const el = en.target as HTMLElement;
      const d = Number(el.dataset.revealDelay ?? 0) * 80;
      setTimeout(() => el.classList.add('revealed'), d);
      io.unobserve(el);
    }
  }, { threshold: 0.2 });
  els.forEach(e => io.observe(e));
}
```

CSS in global.css:
```css
@media (prefers-reduced-motion: no-preference) {
  [data-reveal] { opacity: 0; transform: translateY(24px); filter: blur(8px);
    transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1), filter .7s cubic-bezier(.22,1,.36,1); }
  [data-reveal].revealed { opacity: 1; transform: none; filter: blur(0); }
}
```

- [ ] **Step 2: `counters.ts`** — IO-triggered rAF count-up, respects reduced motion (jump straight to value).
- [ ] **Step 3: Atoms** — Button, SectionHeading, Stat per interface above. Wire `initReveals()`/`initCounters()` in Base via `<script>` module.
- [ ] **Step 4: Verify** on smoke page: add sample `data-reveal` blocks + counter, check blur-in stagger in dev, check reduced-motion via devtools emulation.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: blur scroll-reveal and counter motion system, UI atoms"`

---

### Task 5: Service icons + imagery pipeline

**Files:**
- Create: `src/components/icons/IconFitout.astro`, `IconCleaning.astro`, `IconJoinery.astro`, `IconSignage.astro`, `src/components/ArchImage.astro`
- Create: `src/assets/img/` — downloaded, license-free photos (hero ×1, per-service ×3, projects ×8, about ×2), warm-graded selections

**Interfaces:**
- Produces: 4 icon components (48×48 viewBox, 1.5px stroke, currentColor, geometry echoing vertical pillar strokes — e.g. fitout = pillar + level line, cleaning = pillar + sweep arc, joinery = pillar + dovetail notches, signage = pillar + sign panel). `ArchImage.astro` props `{ src: ImageMetadata, alt: string, class? }` — Astro `<Image>` clipped by subtle arch-top mask (border-radius top: 999px 999px / 240px, tuned visually).

- [ ] **Step 1: Draw 4 SVG icons** hand-authored paths per description — consistent stroke, no icon-pack imports.
- [ ] **Step 2: Source photos** — Unsplash direct downloads (free license) fitting: GCC/modern interiors, construction site, joinery workshop, signage install, office cleaning. Warm/neutral tones. Save to `src/assets/img/` with descriptive names. Record source URLs in `src/assets/img/CREDITS.md`.
- [ ] **Step 3: ArchImage component** with Astro Image (widths `[480, 800, 1200]`, `format="avif"` fallback webp, lazy except `loading` prop passthrough for hero).
- [ ] **Step 4: Verify** `pnpm build` — images optimize without error.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: custom service icons, arch image component, photo assets"`

---

### Task 6: Home page (both languages)

**Files:**
- Create: `src/pages/[lang]/index.astro` (replace smoke), `src/components/home/Hero.astro`, `ServicesGrid.astro`, `WhyUs.astro`, `FeaturedProjects.astro`, `CtaBand.astro`, `src/components/PillarLineDraw.astro`

**Interfaces:**
- Consumes: dict `home.*`, `services`, `company.stats`, atoms, icons, ArchImage.
- Produces: `CtaBand.astro` props `{ lang }` — reused by all other pages.

- [ ] **Step 1: Hero** — full-viewport charcoal, pillar SVG line-draw animation (`stroke-dasharray` CSS keyframes on logo-derived paths, plays once on load, reduced-motion → static), headline Fraunces 64px+/clamp with staggered `data-reveal`, sub, dual CTA (gold "Get a Quote" → contact, outline WhatsApp), faint pillar watermark strokes in background, gold hairline bottom rule.
- [ ] **Step 2: ServicesGrid** — 4 cards on sand band, icon + title + tagline + "Learn more" underline-sweep, hover lifts card w/ gold top rule, links to service pages, staggered reveals.
- [ ] **Step 3: WhyUs** — split: 3 differentiator points (dict `whyPoints`: on-time delivery / one contractor for every trade / Omani market knowledge) + stat counters row (years, projects, clients from `company.stats`).
- [ ] **Step 4: FeaturedProjects** — horizontal strip of 3 ArchImage cards linking to /projects.
- [ ] **Step 5: CtaBand** — charcoal band, Fraunces headline ("Have a project in mind?" / "هل لديك مشروع؟"), gold CTA + WhatsApp.
- [ ] **Step 6: Verify** both `/en/` and `/ar/` in dev — RTL mirroring correct (grid order, icon placement, reveals), hero draw plays, counters run. `pnpm build` passes.
- [ ] **Step 7: Commit** `git add -A && git commit -m "feat: home page with hero line-draw, services grid, stats, CTA band"`

---

### Task 7: Services index + 4 service detail pages

**Files:**
- Create: `src/pages/[lang]/services/index.astro`, `src/pages/[lang]/services/[slug].astro`, `src/components/services/ScopeList.astro`, `ProcessSteps.astro`

**Interfaces:**
- Consumes: `services` data (Task 2), atoms, ArchImage, CtaBand.
- Produces: nothing downstream.

- [ ] **Step 1: Services index** — page hero (sand), 4 large alternating rows (image + scope teaser + link), reveals.
- [ ] **Step 2: `[slug].astro`** — `getStaticPaths` = langs × services. Sections: hero w/ service image + tagline; ScopeList (two-column checklist, gold pillar-bullet SVG marks); ProcessSteps (4 numbered steps — 01 Consultation & site visit, 02 Proposal & quotation, 03 Execution, 04 Handover & support — numerals Fraunces gold); mini gallery (2-3 images); CtaBand.
- [ ] **Step 3: Verify** all 8 service pages + 2 indexes build; spot-check `/ar/services/joinery` RTL. `pnpm build`.
- [ ] **Step 4: Commit** `git add -A && git commit -m "feat: services index and four service detail pages"`

---

### Task 8: About page + journey timeline (Lifeline-style)

**Files:**
- Create: `src/pages/[lang]/about.astro`, `src/components/about/Timeline.astro`, `src/scripts/timeline.ts`, `src/data/milestones.ts`

**Interfaces:**
- Consumes: dict `about.*`, atoms, CtaBand.
- Produces: `milestones` in `src/data/milestones.ts`: `{ year: string, title: {en,ar}, body: {en,ar} }[]` — 5 placeholder milestones (founding, first major fitout, joinery workshop opened, signage division, 100th project) marked `// PLACEHOLDER`.

- [ ] **Step 1: About sections** — story (2 paragraphs + arch image), mission/values 3 cards (Quality / Reliability / Craft), approach paragraph.
- [ ] **Step 2: Timeline markup** — desktop: horizontal scroll-snap rail, gold 2px line, pillar-motif markers per milestone, year in Fraunces, card below marker; mobile: vertical rail `inset-inline-start`. RTL: rail and scroll direction flow right→left (logical props + `direction` inheritance handles it; verify snap behavior).
- [ ] **Step 3: `timeline.ts`** — on first visibility: rail draws via `scaleX` transform origin `inline-start` (1.2s ease-out), markers pop in sequence (scale 0→1 stagger 150ms), cards blur-reveal. Hover/focus marker → card lifts + gold glow. Reduced motion → all visible immediately.
- [ ] **Step 4: Verify** EN + AR, desktop + narrow viewport; AR rail flows right-to-left. `pnpm build`.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: about page with animated journey timeline"`

---

### Task 9: Projects page with filter + lightbox

**Files:**
- Create: `src/pages/[lang]/projects.astro`, `src/data/projects.ts`, `src/scripts/projects.ts`

**Interfaces:**
- Consumes: atoms, ArchImage, CtaBand, `services` slugs for filter categories.
- Produces: `projects` data: `{ id, title: {en,ar}, category: ServiceSlug, location: {en,ar}, image }[]` — 8 placeholder projects marked `// PLACEHOLDER`.

- [ ] **Step 1: Grid** — filter pill row (All + 4 services, from dict), masonry-ish responsive grid, cards show image/title/category/location.
- [ ] **Step 2: `projects.ts`** — filter: toggle `hidden` by `data-category`, animate with view-transition-friendly fade (or class-based blur-fade); lightbox: `<dialog>` element, arrow-key + swipe nav, Esc close, focus trap via native dialog, localized aria-labels.
- [ ] **Step 3: Verify** filters + lightbox both languages, keyboard nav. `pnpm build`.
- [ ] **Step 4: Commit** `git add -A && git commit -m "feat: projects gallery with category filter and lightbox"`

---

### Task 10: Contact page + 404

**Files:**
- Create: `src/pages/[lang]/contact.astro`, `src/pages/404.astro`

**Interfaces:**
- Consumes: `company`, dict `contact.*`/`notFound`, atoms.

- [ ] **Step 1: Contact** — split layout: contact channels (WhatsApp primary big gold button, phone tel:, email mailto:, address, hours Sun–Thu 8:00–18:00 placeholder) + map iframe (`company.mapEmbedUrl`, `loading="lazy"`, `title` localized). CR number displayed. No form (spec).
- [ ] **Step 2: 404** — bilingual (both languages on one page, EN + AR blocks), pillar watermark, links home.
- [ ] **Step 3: Verify** links (`wa.me` format `https://wa.me/968XXXXXXXX`), map lazy-loads. `pnpm build`.
- [ ] **Step 4: Commit** `git add -A && git commit -m "feat: contact page and bilingual 404"`

---

### Task 11: SEO, sitemap, OG, accessibility pass

**Files:**
- Modify: `astro.config.mjs` (add `@astrojs/sitemap`), `src/layouts/Base.astro`
- Create: `public/robots.txt`, `src/assets/og-image.png` (1200×630 — charcoal, logo, gold rule, bilingual name; generate via simple canvas script or static export)

- [ ] **Step 1:** `pnpm add @astrojs/sitemap`; wire integration; robots.txt pointing at sitemap.
- [ ] **Step 2:** Per-page unique titles/descriptions both languages (verify each page passes real values to Base, no duplicates); OG image wired; JSON-LD `LocalBusiness` in Base (name, address, phone from `company`, `areaServed: "OM"`).
- [ ] **Step 3: Accessibility sweep** — skip link, single h1 per page, focus-visible gold outline styles, contrast check (stone-on-ivory for captions only ≥ AA large; body ink-on-ivory), alt text present both languages, `aria-current` on nav, dialog semantics.
- [ ] **Step 4: Verify** `pnpm build`; run Lighthouse on `pnpm preview` for `/en/` and `/ar/` — target ≥95 all categories; fix regressions found.
- [ ] **Step 5: Commit** `git add -A && git commit -m "feat: SEO meta, sitemap, JSON-LD, accessibility pass"`

---

### Task 12: Final polish + full QA

**Files:** touch-ups across components.

- [ ] **Step 1: Cross-page QA matrix** — every page × EN/AR × 360px/768px/1440px in dev: no horizontal scroll, RTL mirror correctness, reveal timing, header states, WhatsApp float not overlapping content.
- [ ] **Step 2: Copy proofread** — full Arabic read-through for register/grammar; EN for tone consistency.
- [ ] **Step 3: Perf check** — total JS < 20KB gzip, images AVIF/WebP served, fonts subset (`unicode-range` from Fontsource is automatic — verify no unused weights imported).
- [ ] **Step 4:** `pnpm build && pnpm preview` final Lighthouse both languages; record scores in README.
- [ ] **Step 5: README** — stack, dev commands, and **"Before launch" checklist**: swap placeholders in `src/data/company.ts`, `milestones.ts`, `projects.ts`, domain in `astro.config.mjs`, real photos.
- [ ] **Step 6: Commit** `git add -A && git commit -m "chore: final polish, QA, launch checklist"`
