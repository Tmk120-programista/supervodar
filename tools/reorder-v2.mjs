// Reorders the v2 sections and reassigns their background / angled-edge classes
// so the colour rhythm still alternates after the move.
import fs from 'node:fs';

const FILE = 'docs/v2/index.html';
let html = fs.readFileSync(FILE, 'utf8');

// Each section is identified by a marker that only it contains.
const MARK = {
  services: 'id="sluzby"',
  benefits: 'class="bens"',
  steps: 'class="flow"',
  pricing: 'class="pricepanel"',
  about: 'class="about"',
  reviews: 'id="opinie"',
  districts: 'id="casti"',
  contact: 'id="kontakt"',
};

// [key, classes] — white / tint alternate, with one dark anchor at the price list.
const ORDER = [
  ['services', ''],
  ['reviews', 'tint slant'],
  ['benefits', 'slant'],
  ['about', 'tint slant'],
  ['steps', 'slant'],
  ['pricing', 'warm slant'],
  ['districts', 'slant'],
  ['contact', 'tint slant'],
];

const blocks = [...html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)];
if (blocks.length !== 8) {
  console.error('Spodziewano sie 8 sekcji, znaleziono ' + blocks.length + ' — przerywam.');
  process.exit(1);
}

const found = {};
for (const m of blocks) {
  const key = Object.keys(MARK).find((k) => m[0].includes(MARK[k]));
  if (!key) {
    console.error('Nie rozpoznano sekcji zaczynajacej sie: ' + m[0].slice(0, 90));
    process.exit(1);
  }
  if (found[key]) {
    console.error('Sekcja ' + key + ' wystapila dwa razy — przerywam.');
    process.exit(1);
  }
  found[key] = m[0];
}

const missing = ORDER.map(([k]) => k).filter((k) => !found[k]);
if (missing.length) {
  console.error('Brakuje sekcji: ' + missing.join(', '));
  process.exit(1);
}

const rebuilt = ORDER.map(([key, cls]) => {
  const body = found[key].replace(/^<section\b[^>]*>/, '');
  const id = key === 'contact' ? ' id="kontakt"' : '';
  const classAttr = cls ? ' class="' + cls + '"' : '';
  return '<section' + id + classAttr + '>' + body;
}).join('\n\n');

const start = html.indexOf(blocks[0][0]);
const last = blocks[blocks.length - 1][0];
const end = html.indexOf(last) + last.length;

html = html.slice(0, start) + rebuilt + html.slice(end);
fs.writeFileSync(FILE, html);

console.log('nowa kolejnosc:');
ORDER.forEach(([k, c], i) => console.log('  ' + (i + 1) + '. ' + k + (c ? '  [' + c + ']' : '  [biala]')));
