// Three PageSpeed findings in one pass:
//  - card images were served at 800 px while displayed at ~270 px
//  - the document had no <main> landmark for screen readers
//  - (cache TTL is a GitHub Pages limit and cannot be fixed from here)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { SERVICES } from './content-services.mjs';

const DOCS = 'docs';
const IMGDIR = path.join(DOCS, 'img');
const slugName = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

// ---------- 1. smaller variants + stronger compression ----------
const names = SERVICES.map((s) => 's-' + slugName(s.slug)).concat(['s-havaria']);
let before = 0, after = 0;

for (const base of names) {
  const src = path.join(IMGDIR, base + '.webp');
  if (!fs.existsSync(src)) { console.error('BRAK: ' + base); continue; }
  before += fs.statSync(src).size;

  // Read into memory first: sharp keeps the source handle open, so writing back
  // to the same path while it is still reading fails on Windows.
  const input = fs.readFileSync(src);

  for (const w of [400, 640]) {
    await sharp(input).resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 70, effort: 6 })
      .toFile(path.join(IMGDIR, base + '-' + w + '.webp'));
  }
  // re-encode the 800 px original a little harder as well
  const buf = await sharp(input).webp({ quality: 70, effort: 6 }).toBuffer();
  fs.writeFileSync(src, buf);

  after += fs.statSync(src).size
    + fs.statSync(path.join(IMGDIR, base + '-400.webp')).size
    + fs.statSync(path.join(IMGDIR, base + '-640.webp')).size;
}
console.log('karty: ' + (before / 1024).toFixed(0) + ' KB -> ' + (after / 1024).toFixed(0) +
  ' KB w trzech wariantach (przegladarka pobiera jeden)');

// ---------- 2. srcset in the builder ----------
const SIZES = '(max-width:640px) 92vw, (max-width:1180px) 45vw, 261px';
let b = fs.readFileSync('tools/build-pages.mjs', 'utf8');
const oldImg = "      `<img src=\"../${x.img}\" alt=\"${attr(x.nav)} — vodár Bratislava\" loading=\"lazy\" width=\"400\" height=\"152\">` +";
const newImg = "      `<img src=\"../${x.img}\" srcset=\"${srcset(x.img)}\" sizes=\"" + SIZES + "\"` +\n" +
  "      ` alt=\"${attr(x.nav)} — vodár Bratislava\" loading=\"lazy\" width=\"400\" height=\"152\">` +";
if (b.includes(oldImg)) {
  b = b.replace(oldImg, newImg);
  b = b.replace("const svcCards = (slugs, compact) =>",
    "// browsers pick the narrowest file that still covers the slot\n" +
    "const srcset = (base) => {\n" +
    "  const stem = base.replace(/\\.webp$/, '');\n" +
    "  return ['../' + stem + '-400.webp 400w', '../' + stem + '-640.webp 640w', '../' + base + ' 800w'].join(', ');\n" +
    "};\n\nconst svcCards = (slugs, compact) =>");
  console.log('generator: srcset dodany do kart uslug');
} else console.error('NIE ZNALEZIONO taga img w svcCards');

// ---------- 3. <main> landmark in the builder ----------
if (!b.includes('<main id="obsah">')) {
  b = b.replace("${HEADER.replace(/href=\"#top\"/, 'href=\"../\"')}", "${HEADER.replace(/href=\"#top\"/, 'href=\"../\"')}\n<main id=\"obsah\">");
  b = b.replace('const tail = `${CONTACT}', 'const tail = `${CONTACT}\n</main>');
  console.log('generator: dodany <main>');
}
fs.writeFileSync('tools/build-pages.mjs', b);

// ---------- 4. homepage: srcset on the prerendered cards + <main> ----------
let h = fs.readFileSync(path.join(DOCS, 'index.html'), 'utf8');
let cards = 0;
h = h.replace(/<img src="(img\/s-[a-z0-9-]+)\.webp" alt="([^"]*)" loading="lazy" width="400" height="152">/g,
  (m, stem, alt) => {
    cards++;
    return '<img src="' + stem + '.webp" srcset="' + stem + '-400.webp 400w, ' + stem +
      '-640.webp 640w, ' + stem + '.webp 800w" sizes="' + SIZES +
      '" alt="' + alt + '" loading="lazy" width="400" height="152">';
  });
console.log('strona glowna: srcset na ' + cards + ' kartach');

if (!h.includes('<main id="obsah">')) {
  h = h.replace('</header>', '</header>\n<main id="obsah">');
  h = h.replace('<footer class="ft">', '</main>\n<footer class="ft">');
  console.log('strona glowna: dodany <main>');
}
fs.writeFileSync(path.join(DOCS, 'index.html'), h);
