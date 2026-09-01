// One-off: regenerate favicon assets from the real logo mark with a solid
// background fill, so the thin pillar strokes stay legible at 16-32px in a
// browser tab (transparent-background SVG at tiny sizes reads as a blank
// smudge on dark browser chrome).
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const svg = readFileSync('src/assets/logo-square.svg', 'utf-8');
const withBg = svg.replace(
  '<defs>',
  '<rect width="350" height="350" fill="#2B2B2B"/><defs>',
);
writeFileSync('public/favicon.svg', withBg);

for (const size of [16, 32, 48, 180]) {
  await sharp(Buffer.from(withBg))
    .resize(size, size)
    .png()
    .toFile(size === 180 ? 'public/apple-touch-icon.png' : `public/favicon-${size}.png`);
}

// favicon.ico: a real 32x32 ICO (the previous file was a PNG mislabeled
// .ico, which most browsers tolerate but isn't correct).
const png32 = await sharp(Buffer.from(withBg)).resize(32, 32).png().toBuffer();
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);
const dirEntry = Buffer.alloc(16);
dirEntry.writeUInt8(32, 0);
dirEntry.writeUInt8(32, 1);
dirEntry.writeUInt8(0, 2);
dirEntry.writeUInt8(0, 3);
dirEntry.writeUInt16LE(1, 4);
dirEntry.writeUInt16LE(32, 6);
dirEntry.writeUInt32LE(png32.length, 8);
dirEntry.writeUInt32LE(22, 12);
writeFileSync('public/favicon.ico', Buffer.concat([icoHeader, dirEntry, png32]));

console.log('favicons regenerated');
