// Bakes the JS-generated cards into the HTML source.
// Search engines (and users with JS disabled) then see the services, reviews and
// district links directly, instead of three empty containers.
import fs from 'node:fs';

const FILE = 'docs/v2/index.html';
let html = fs.readFileSync(FILE, 'utf8');
const P = '../cdn-assets/cdn.bitrix24.pl/b20237281/landing/';

const grab = (name) => {
  const m = html.match(new RegExp('var ' + name + ' = (\\[[\\s\\S]*?\\n?\\s*\\]);'));
  if (!m) throw new Error('nie znaleziono danych: ' + name);
  return new Function('return ' + m[1])();
};

const SERVICES = grab('SERVICES');
const REVIEWS = grab('REVIEWS');
const PARTS = grab('PARTS');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const services = SERVICES.map((s) => {
  const img = '<img src="' + P + s[2] + '" alt="' + esc(s[0]) + ' — vodár Bratislava" loading="lazy" width="400" height="152">';
  const tx = '<div class="tx"><h3>' + esc(s[0]) + '</h3><p>' + esc(s[1]) + '</p></div>';
  return s[3]
    ? '<a class="svc" href="../' + s[3] + '/">' + img + tx + '</a>'
    : '<article class="svc">' + img + tx + '</article>';
}).join('\n');

const GLOGO = P + 'f40/f40bf46204c63154383175299cefcbb8/985_google_g_icon_1x_11zon_2x.webp';
const AVCOL = ['#0b3a5d', '#12a150', '#12507d', '#b4651a', '#6d3d8c', '#1d6ea8'];
const reviews = REVIEWS.map((r, i) =>
  '<article class="rev">' +
  '<div class="revtop"><div class="stars" aria-label="Hodnotenie 5 z 5">★★★★★</div>' +
  '<img class="gmark" src="' + GLOGO + '" alt="Hodnotenie na Google" loading="lazy" width="19" height="19"></div>' +
  '<p>' + esc(r[2]) + '</p>' +
  '<div class="revwho"><span class="avat" style="background:' + AVCOL[i % AVCOL.length] + '">' + esc(r[0].charAt(0)) + '</span>' +
  '<span><b>' + esc(r[0]) + '</b><span>' + esc(r[1]) + '</span></span></div></article>'
).join('\n');

const parts = PARTS.map((p) => '<a class="chip" href="../' + p[1] + '/">Vodár ' + esc(p[0]) + '</a>').join('\n');

const fill = (id, markup) => {
  const re = new RegExp('(<div class="[^"]*" id="' + id + '">)\\s*(?:[\\s\\S]*?)(</div>)');
  if (!re.test(html)) throw new Error('nie znaleziono kontenera: ' + id);
  html = html.replace(re, '$1\n' + markup + '\n$2');
};

fill('sluzby', services);
fill('opinie', reviews);
fill('casti', parts);

// Drop the generator code — the markup now lives in the document.
const cuts = [
  /\s*\/\/ \[title, description[\s\S]*?var SERVICES = \[[\s\S]*?\n {2}\];/,
  /\s*document\.getElementById\('sluzby'\)\.innerHTML[\s\S]*?\}\)\.join\(''\);/,
  /\s*var REVIEWS = \[[\s\S]*?\n {2}\];/,
  /\s*\/\/ These are Google reviews[\s\S]*?\}\)\.join\(''\);/,
  /\s*var PARTS = \[[\s\S]*?\}\)\.join\(''\);/,
];
let cut = 0;
for (const re of cuts) {
  if (re.test(html)) { html = html.replace(re, ''); cut++; }
}

fs.writeFileSync(FILE, html);
console.log('wstawione statycznie: ' + SERVICES.length + ' uslug, ' + REVIEWS.length + ' opinii, ' + PARTS.length + ' dzielnic');
console.log('usunietych blokow generujacych: ' + cut + '/' + cuts.length);
