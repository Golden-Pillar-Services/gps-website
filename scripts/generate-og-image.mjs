// One-off regeneration tool for the static Open Graph share image.
// Run with: node scripts/generate-og-image.mjs
// Produces public/og-image.png (1200x630), rasterized from an inline SVG
// via sharp (already a devDependency for Astro's image pipeline).
//
// This lives under public/, not src/assets/, on purpose: Base.astro builds
// the og:image URL as a plain absolute path (`new URL('/og-image.png',
// site)`), not an Astro-processed asset import, so the file must be served
// verbatim from the site root rather than run through the image pipeline.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const WIDTH = 1200;
const HEIGHT = 630;

// Golden Pillar wordmark pillar-strokes, lifted from src/assets/logo-square.svg
// (viewBox 0 0 350 350), recolored for the charcoal OG background: dark
// strokes -> ivory, gold strokes -> gold-light.
const pillarMarkSvg = readFileSync(path.join(root, 'src/assets/logo-square.svg'), 'utf8')
  .replace('#c9932b', '#E3B65A')
  .replace('#343434', '#FAF7F0');

// Strip the outer <svg> wrapper so the paths can be re-embedded inside a
// <g transform> in the composed OG image.
const innerMark = pillarMarkSvg
  .replace(/<\?xml[^>]*\?>\s*/, '')
  .replace(/<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/<!--.*?-->/gs, '');

const markSize = 110;
const markX = WIDTH / 2 - markSize / 2;
const markY = 92;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="${WIDTH}" y2="${HEIGHT}" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2B2B2B"/>
      <stop offset="100%" stop-color="#1A1917"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>

  <!-- subtle border frame -->
  <rect x="28" y="28" width="${WIDTH - 56}" height="${HEIGHT - 56}" fill="none" stroke="#C9932B" stroke-opacity="0.35" stroke-width="1.5"/>

  <!-- pillar mark -->
  <g transform="translate(${markX}, ${markY}) scale(${markSize / 350})">
    ${innerMark}
  </g>

  <!-- gold hairline rule -->
  <line x1="${WIDTH / 2 - 90}" y1="238" x2="${WIDTH / 2 + 90}" y2="238" stroke="#C9932B" stroke-width="2"/>

  <!-- company name, EN -->
  <text x="${WIDTH / 2}" y="300" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="56" font-weight="600" fill="#FAF7F0">Golden Pillar Services</text>

  <!-- company name, AR -->
  <text x="${WIDTH / 2}" y="358" text-anchor="middle" font-family="'Segoe UI', Tahoma, Arial, sans-serif" font-size="34" fill="#E3B65A" direction="rtl">الركيزة الذهبية للخدمات</text>

  <!-- tagline -->
  <text x="${WIDTH / 2}" y="410" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" letter-spacing="3" fill="#8A8578">FITOUT &#183; JOINERY &#183; SIGNAGE &#183; CLEANING</text>

  <!-- footer strip -->
  <text x="${WIDTH / 2}" y="${HEIGHT - 52}" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" letter-spacing="2" fill="#8A8578">MUSCAT, SULTANATE OF OMAN</text>
</svg>
`;

const outPath = path.join(root, 'public/og-image.png');
await sharp(Buffer.from(svg)).png().toFile(outPath);
console.log(`Wrote ${outPath}`);
