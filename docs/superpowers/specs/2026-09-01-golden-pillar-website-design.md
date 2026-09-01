# Golden Pillar Services — Marketing Website Design Spec

**Date:** 2026-09-01
**Status:** Approved direction, pending final user review

## 1. Purpose

Production-ready bilingual (English/Arabic) marketing website for Golden Pillar Services, an Omani company operating in:

- Fitout & Construction
- Cleaning Services
- Joinery
- Signage

Primary goal: credibility signal for B2B decision makers in Oman (property owners, developers, mall/retail managers, facility management companies, government procurement). The site must read as established, capable, and trustworthy — premium restraint, not flash.

## 2. Tech Stack

- **Framework:** Astro (static output). No CMS, no backend.
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`).
- **Fonts:** Self-hosted via Fontsource — no runtime Google Fonts requests.
- **Interactivity:** Vanilla TS + IntersectionObserver. No React/GSAP. Small scoped scripts only.
- **Hosting target:** Any static host (Cloudflare Pages / Netlify / Vercel). No lock-in.
- **Contact:** No form backend. WhatsApp click-to-chat (primary), tel: and mailto: links. Placeholder numbers/emails clearly marked for later swap.

## 3. Internationalization

- Routes: `/en/...` and `/ar/...`. Root `/` redirects via browser `Accept-Language` (meta/JS fallback), default `en`.
- Full RTL layout for Arabic — designed, not just mirrored: logical CSS properties (`margin-inline-start` etc.), RTL-aware timeline (rail flows right-to-left), RTL-aware carousels and icons.
- Language switcher in header swaps to the **same page** in the other language (EN ⇄ عربي).
- All copy authored bilingually: Modern Standard Arabic, Gulf business register. No machine-translation register.
- `dir="rtl"` + `lang="ar"` on Arabic pages; correct `hreflang` alternates for SEO.
- Content stored in per-language dictionaries/collections so pages share templates.

## 4. Site Map

```
/en/ and /ar/
├── (home)
├── services/                    — index
│   ├── fitout-construction
│   ├── cleaning-services
│   ├── joinery
│   └── signage
├── about
├── projects
└── contact
```

- Header: logo, nav, language switcher. Sticky, translucent over hero.
- Footer: services links, contact block, CR-number placeholder, social placeholders.
- Sticky WhatsApp floating button (mobile especially).
- 404 page, both languages.

## 5. Visual System

### 5.1 Palette (derived from logo: gold #C9932B, charcoal #343434)

| Token | Hex | Use |
|---|---|---|
| gold | #C9932B | accents, CTAs, rules, hover — never large fills |
| gold-light | #E3B65A | hover states, gradients on dark |
| charcoal | #2B2B2B | dark sections, footer, headings |
| ink | #1A1917 | body text on light |
| ivory | #FAF7F0 | main page ground |
| sand | #EFE7D8 | alternate section bands, cards |
| stone | #8A8578 | muted text, captions |

Rhythm: ivory ground, alternating sand bands, one or two full charcoal sections per page (hero + CTA band). Gold ≤ ~5% of surface area — scarcity = prestige.

### 5.2 Typography

- English display: **Fraunces** (variable serif) — headlines only.
- English body/UI: **Inter**.
- Arabic body/UI/headings: **IBM Plex Sans Arabic** (bold weights for headings — clean, modern; no decorative Arabic display face).
- Self-hosted, subset where possible, `font-display: swap` with matched fallback metrics.

### 5.3 Motifs

- Pillar geometry from logo → repeating SVG line motif: section dividers, list bullets, background watermark strokes.
- 1px gold hairline rules framing sections (joinery precision).
- Subtle arch curve (Omani architecture nod) on image masks/cards — restrained.
- Custom SVG service icons drawn to match pillar motif — no generic icon packs.

### 5.4 Imagery

- Warm-graded photography: GCC/Omani interiors, construction, joinery workshops, signage installs. Sourced from free-license photo services, consistently graded.
- All images optimized via Astro `<Image>` (AVIF/WebP, responsive sizes, lazy).

## 6. Motion

- Scroll reveal: fade + rise + **blur (8px → 0)**, staggered per group. IntersectionObserver, CSS transitions.
- Hero: line-draw animation of pillar SVG; headline staggered reveal.
- Stat counters animate on scroll into view.
- Gold underline sweep on link/nav hover.
- **Journey timeline (About page)** — native rebuild of the Lifeline concept (github.com/evilrabbit/lifeline, Next.js-only, not used directly): animated rail draws across milestones; horizontal scroll on desktop, vertical on mobile; markers styled as pillar motif; hover/tap reveal cards with blur-in; rail flows right-to-left in Arabic. Placeholder milestones until real company history provided.
- All motion behind `prefers-reduced-motion` guard.

## 7. Page Content Plan

### Home
1. Charcoal hero — bilingual headline, pillar line-draw SVG, dual CTA (gold "Get a Quote" → contact, WhatsApp secondary)
2. Services grid — 4 cards, custom SVG icons, link to service pages
3. Why-us band — differentiators + animated stat counters (years, projects, clients — placeholders)
4. Featured projects strip
5. Dark CTA band
6. Footer

### Service pages (×4)
1. Hero with service imagery
2. Scope lists:
   - Fitout & Construction: commercial, retail, office, F&B fitout; renovation; MEP coordination
   - Cleaning: deep cleaning, facade/external, post-construction, scheduled commercial
   - Joinery: doors, wardrobes, kitchens, custom furniture, commercial millwork
   - Signage: 3D letters, lightbox signs, wayfinding, vehicle branding, installation
3. Process — 4 numbered steps
4. Gallery
5. CTA band

### About
Story, mission/values (3 cards), **journey timeline**, approach.

### Projects
Filterable grid (filter by service), lightbox view. Placeholder projects marked for later swap.

### Contact
WhatsApp primary CTA, phone/email, Muscat map embed placeholder, working hours (Sun–Thu), location.

## 8. Quality Bar

- Lighthouse: 95+ across the board on both languages.
- Semantic HTML, accessible (focus states, contrast AA, alt text both languages, skip link).
- SEO: per-page meta both languages, `hreflang`, OG images, sitemap, robots.
- Responsive: 360px → 1920px. Touch targets ≥ 44px.
- No horizontal page scroll; wide content scrolls in its own container.

## 9. Placeholders To Swap Later (single source file)

Centralized `src/data/company.ts`: phone, WhatsApp number, email, CR number, address/map coordinates, social links, stat figures, timeline milestones, project entries.

## 10. Out of Scope (YAGNI)

- CMS, blog, careers page, form backend, analytics wiring (slot left for later), team photos section (added when materials exist).
