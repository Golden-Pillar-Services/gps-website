# Design

<!-- impeccable:design-schema 1 -->

## Direction Contract

**THESIS:** Golden Pillar proves precision by showing its work measured,
not by claiming it — refuses the generic dark-hero/gold-CTA/icon-grid
construction-company template shipped three times before this one.

**OWN-WORLD:** Land-survey / blueprint drafting language. Thin gold
"drafting ink" dimension lines with arrow ticks annotate real jobsite
photography (measuring a building's width, a doorway, a distance).
Coordinate-grid backgrounds, scale bars, elevation-drawing-style section
dividers, service icons redrawn as isometric technical line drawings
(not filled icon-pack glyphs). Base palette stays ivory/charcoal/gold
(brand mark is fixed) but gold is re-cast as the single drafting-ink
color rather than a decorative accent. Fraunces carries display
headlines; JetBrains Mono is now structural — sheet numbers, coordinate
tags, dimension labels, scale callouts — not a decorative label font.

**STORY:** A visitor sees the company's actual work "surveyed" — real
photos annotated with real-looking measurements and site coordinates —
and concludes this contractor operates with genuine technical rigor,
not marketing polish. They act via WhatsApp/phone, not a form.

**FIRST VIEWPORT (home hero):** Full-bleed real jobsite photo. Dimension
lines with arrow ticks measure a physical element in the photo (building
width, worker line, scaffold height). A coordinate tag reads the real
Muscat coordinates. A scale bar sits bottom-left. The headline renders
inside a drawing title-block: a bordered panel with a mono meta-row above
it (sheet no. / date / revision, styled like a real drawing's title
block) and the headline itself below. Primary CTA reads as an "approved/
stamped" action, not a generic pill button.

**FORM:** Chosen direction (assigned by random roll after the user said
"surprise me," not the model's own top-ranked pick) out of 3 derived
candidates: Tender-Grade (procurement/spec-document world, ranked #1 by
resonance), **Survey Line — chosen** (land-survey/blueprint world,
ranked #2), Golden Ledger (gold-souk ledger heritage, ranked #3, most
culturally distinctive but riskier fit for a construction trade).
Staging: full-bleed annotated photography as the primary device on every
page hero, carried through as the site's one signature motif.

## Palette

| Token | Hex | Role |
|---|---|---|
| `gold` | `#C9932B` | Drafting-ink color: dimension lines, arrow ticks, coordinate tags, stamps, mono labels. The one accent — used as line/ink, not fill. |
| `gold-light` | `#E3B65A` | Hover states, lighter ink on dark surfaces |
| `charcoal` | `#2B2B2B` | Dark surfaces (header, footer, hero scrims, title-block panels) |
| `ink` | `#1A1917` | Body text on light backgrounds |
| `ivory` | `#FAF7F0` | Base page ground — reads as drafting paper, not generic off-white |
| `sand` | `#EFE7D8` | Alternate section band |
| `stone` | `#8A8578` | Decorative/large text only (exact brand-spec value, fails AA at body size) |
| `stone-dark` | `#6B6656` | Body/caption text needing WCAG AA on ivory/sand |

Gold never fills a large surface. It is drafting ink: 1-2px lines,
arrow ticks, stamps, coordinate tags, mono labels, thin rules.

## Typography

- **Fraunces Variable** — display headlines only. Occasional italic word
  for emphasis (sparingly — one per page maximum, not a running device).
- **Inter Variable** — English body/UI text.
- **IBM Plex Sans Arabic** (400/600/700 loaded) — all Arabic text,
  headings included (real bold glyphs, never browser-synthesized).
  Arabic never gets forced italic — no italic Arabic glyphs exist;
  emphasis there is color/weight only.
- **JetBrains Mono Variable** — structural, not decorative: sheet
  numbers, coordinate tags, dimension/scale labels, stat captions,
  drawing meta-rows. This is the "surveyor's hand" voice — used
  constantly, in both languages (Arabic numerals in mono context stay
  Western/Eastern-Arabic-numeral-neutral — check per string).

## Motif System — Survey/Blueprint Devices

These are the site's signature recurring devices. Reuse them; don't
invent parallel one-off decorations.

1. **Dimension line** (`src/components/survey/DimensionLine.astro`) —
   thin gold line with perpendicular arrow ticks at each end, an
   optional mono label at its midpoint. Never a fabricated numeric
   measurement — either a true descriptive label (e.g. "STRUCTURAL
   WORKS — IN PROGRESS" on the home hero) or no label at all (e.g. the
   short dividers above About's values). Labeling it is the point of the
   device — an unlabeled dimension line reads as a gold hairline, not a
   measurement.
2. **Coordinate tag** (`src/components/survey/CoordinateTag.astro`) —
   small mono badge with a reticle glyph. Two contexts: `numeric` (the
   real Muscat lat/lng on page heroes, forced `dir="ltr"` so the digits
   don't reorder under RTL bidi) and plain (a project's real bilingual
   location string on the Projects grid, natural text direction, `light`
   variant for use on ivory cards instead of a photo).
3. **Scale bar** (`src/components/survey/ScaleBar.astro`) — alternating
   tick graphic with distance markers (0 / 10 / 20 m) and a localized
   "SCALE" / "المقياس" label — illustrative, not tied to a specific
   measured distance, same convention a real drawing's scale bar uses.
4. **Title block** — bordered panel with a mono meta-row (sheet no. /
   rev. / company) above the heading. Used on every page hero
   (`Hero.astro`, `PageHero.astro`, sheet numbers 01-05) and mirrored at
   the close of every page as a sheet-footer row in `CtaBand.astro`
   (company name / rev., not a repeated eyebrow).
5. **Corner registration marks** — small L-shaped gold corner brackets
   framing a hero photo or a full-bleed section (`Hero.astro`,
   `PageHero.astro`, `WhyUs.astro`, `CtaBand.astro`).
6. **Data sheet table** — bordered mono label/value rows (not the
   generic "big number, small label" stat template). Used for the home
   page's stats (`WhyUs.astro`) and Contact's channel list
   (`contact.astro`) — both read as a drawing's metadata block.
7. **Technical-line service icons** (`src/components/icons/Icon*.astro`)
   — redrawn per service using real drawing conventions: an elevation
   outline + dashed construction centerline + dimension ticks (Fitout),
   a dashed swept-area boundary + coverage-arc marker (Cleaning), a
   section-view panel with an actual dovetail joint detail (Joinery), a
   sign-panel elevation with a leader-line callout (Signage). Not
   isometric 3D projection — elevation/section-view line drawings, which
   DESIGN.md's own audit found buildable at real fidelity where true
   isometric projection was not, given the constraints of this session.
8. **Drafting-grid ground** — a real coordinate grid (linear-gradient
   hairlines, not `feTurbulence` noise) at ~5% opacity on the body
   background. Earned specifically because the whole site's world is a
   survey/blueprint drawing — the craft floor's own carve-out for grid
   overlays is "an actual canvas, map, blueprint, or measuring tool
   under them."

## Layout Rules

- Corners stay sharp/near-sharp (`rounded-sm` at most) on cards, panels,
  images, and buttons — drafting documents don't have soft rounded
  corners. Exception: small toggle/filter/tag controls (language switch,
  category filter pills) stay pill-shaped — that's the standard affordance
  for a selectable chip, not a drafting surface, and forcing it sharp
  would cost real usability signal for no gain to the world.
- RTL: every motif above must work mirrored. Dimension-line arrow ticks,
  coordinate tags, and title-block meta-rows use logical CSS properties;
  verify each one specifically in Arabic, not just assumed from LTR.
- No arch-shaped or heavily rounded image clipping (rejected in a prior
  pass, stays rejected — sharp rectangular photo frames only, optionally
  with corner registration marks).

## Motion

- Scroll reveal stays: fade + rise + blur, `prefers-reduced-motion`
  guarded (established, works, keep).
- Dimension lines "draw in" on scroll reveal (stroke animation) where
  feasible — reinforces the drafting-in-progress feel. Falls back to
  static when reduced-motion is set.

## What This Replaces

The prior visual system (dark-hero-with-gold-accent, monospace labels
as generic small-caps eyebrows only, corner brackets as a standalone
decoration, arch-clipped photos) is retired. Corner registration marks
and the monospace typeface survive but are re-cast as part of the
survey/blueprint device system above, not standalone decoration.
