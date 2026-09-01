import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:4321/en/';
const out = process.argv[3] || 'screenshot.png';
const width = Number(process.argv[4] || 1440);
const height = Number(process.argv[5] || 950);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
page.on('pageerror', (err) => console.log('[pageerror]', err.message));
await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
await page.screenshot({ path: out }); // viewport only — just the hero
await browser.close();
console.log(`saved ${out}`);
