// Re-encodes every image the site actually uses into WebP at sensible sizes.
// The originals were straight off the old CDN — the hero alone was 3840 px wide
// and 470 KB, served to phones as the LCP element.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { SERVICES } from './content-services.mjs';

const DOCS = 'docs';
const OUT = path.join(DOCS, 'img');
fs.mkdirSync(OUT, { recursive: true });

const HERO = 'cdn-assets/cdn.bitrix24.pl/b20237281/landing/b6a/b6ab2a5919eecfe4749610065af0864d/AdobeStock_382341959_2x.jpeg';
const ABOUT = 'cdn-assets/cdn.bitrix24.pl/b20237281/landing/205/20547ae6b6b0602da7de2a132b18c84c/maxresdefault_2x_1x.jpg';
const GLOGO = 'cdn-assets/cdn.bitrix24.pl/b20237281/landing/f40/f40bf46204c63154383175299cefcbb8/985_google_g_icon_1x_11zon_2x.webp';

// [source, output name, target width, quality]
const JOBS = [
  [HERO, 'hero-1920.webp', 1920, 74],
  [HERO, 'hero-960.webp', 960, 74],
  [ABOUT, 'o-nas.webp', 900, 78],
];
for (const s of SERVICES) {
  const name = 's-' + s.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.webp';
  JOBS.push([s.img, name, 800, 76]);
  // the same photo doubles as the page hero, where 800 px would look soft
  JOBS.push([s.img, 'h-' + s.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.webp', 1600, 72]);
}

const mapping = {};
let before = 0;
let after = 0;

for (const [src, name, width, quality] of JOBS) {
  const full = path.join(DOCS, src);
  if (!fs.existsSync(full)) {
    console.error('BRAK zrodla: ' + src);
    continue;
  }
  const dst = path.join(OUT, name);
  const meta = await sharp(full).metadata();
  await sharp(full)
    .resize({ width: Math.min(width, meta.width), withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(dst);

  const b = fs.statSync(full).size;
  const a = fs.statSync(dst).size;
  // count each source once even though the hero is encoded twice
  if (!mapping[src]) before += b;
  after += a;
  mapping[src] = mapping[src] || [];
  mapping[src].push({ name, width: Math.min(width, meta.width), bytes: a });
  console.log(
    String((b / 1024).toFixed(0)).padStart(5) + ' KB -> ' +
    String((a / 1024).toFixed(0)).padStart(4) + ' KB  ' + name
  );
}

// keep the Google mark as-is; it is already 1 KB
fs.copyFileSync(path.join(DOCS, GLOGO), path.join(OUT, 'google.webp'));

fs.writeFileSync(path.join(OUT, 'mapping.json'), JSON.stringify(mapping, null, 1));
console.log('\nzrodla razem: ' + (before / 1024).toFixed(0) + ' KB');
console.log('po konwersji: ' + (after / 1024).toFixed(0) + ' KB (wraz z dodatkowym wariantem hero)');
console.log('oszczednosc:  ' + (100 - Math.round((after / before) * 100)) + '%');
