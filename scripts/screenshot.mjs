import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:4321/en/';
const out = process.argv[3] || 'screenshot.png';
const width = Number(process.argv[4] || 1440);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 } });
page.on('pageerror', (err) => console.log('[pageerror]', err.message));
await page.goto(url, { waitUntil: 'networkidle' });

// Scroll all the way down in steps so every IntersectionObserver-triggered
// reveal actually fires, the way a real visitor scrolling the page would.
const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < scrollHeight; y += 500) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(120);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(600);

await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(`saved ${out}`);
