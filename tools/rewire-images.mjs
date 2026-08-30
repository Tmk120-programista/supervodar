// Points the site at the optimised WebP files and gives the hero a responsive
// srcset plus explicit dimensions (the hero <img> was the only one without them,
// which is what made the layout shift on load).
import fs from 'node:fs';
import { SERVICES } from './content-services.mjs';

const slugName = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

// old cdn path -> new card path
const map = {};
for (const s of SERVICES) map[s.img] = 'img/s-' + slugName(s.slug) + '.webp';
map['cdn-assets/cdn.bitrix24.pl/b20237281/landing/b6a/b6ab2a5919eecfe4749610065af0864d/AdobeStock_382341959_2x.jpeg'] = 'img/hero-1920.webp';
map['cdn-assets/cdn.bitrix24.pl/b20237281/landing/205/20547ae6b6b0602da7de2a132b18c84c/maxresdefault_2x_1x.jpg'] = 'img/o-nas.webp';
map['cdn-assets/cdn.bitrix24.pl/b20237281/landing/f40/f40bf46204c63154383175299cefcbb8/985_google_g_icon_1x_11zon_2x.webp'] = 'img/google.webp';

// ---- 1. content file: card image + a bigger variant for the page hero
let cs = fs.readFileSync('tools/content-services.mjs', 'utf8');
let n = 0;
for (const s of SERVICES) {
  const rel = s.img.replace('cdn-assets/cdn.bitrix24.pl/b20237281/landing/', '');
  const from = "img: IMG + '" + rel + "',";
  const to = "img: 'img/s-" + slugName(s.slug) + ".webp',\n    hero: 'img/h-" + slugName(s.slug) + ".webp',";
  if (cs.includes(from)) { cs = cs.replace(from, to); n++; }
  else console.error('nie znaleziono img dla: ' + s.slug);
}
fs.writeFileSync('tools/content-services.mjs', cs);
console.log('sciezek w tresciach uslug: ' + n + '/' + SERVICES.length);

// ---- 2. homepage: swap every old path, then upgrade the hero tag
let h = fs.readFileSync('docs/index.html', 'utf8');
let swapped = 0;
for (const [from, to] of Object.entries(map)) {
  const c = h.split(from).length - 1;
  if (c) { h = h.split(from).join(to); swapped += c; }
}
// absolute URLs in og:/twitter: meta and preload
h = h.replace(/https:\/\/supervodarba\.sk\/img\/hero-1920\.webp/g, 'https://supervodarba.sk/img/hero-1920.webp');

const heroOld = h.match(/<img src="img\/hero-1920\.webp"[^>]*>/);
if (heroOld) {
  const alt = (heroOld[0].match(/alt="([^"]*)"/) || [, 'Vodár pri práci v Bratislave'])[1];
  h = h.replace(heroOld[0],
    '<img src="img/hero-1920.webp" ' +
    'srcset="img/hero-960.webp 960w, img/hero-1920.webp 1920w" sizes="100vw" ' +
    'width="1920" height="646" alt="' + alt + '" fetchpriority="high" decoding="async">');
  console.log('hero: dodany srcset i wymiary');
} else {
  console.error('nie znaleziono taga hero na stronie glownej');
}
// preload should match what the browser will actually pick
h = h.replace(/<link rel="preload" as="image" href="[^"]*"[^>]*>/,
  '<link rel="preload" as="image" href="img/hero-1920.webp" ' +
  'imagesrcset="img/hero-960.webp 960w, img/hero-1920.webp 1920w" imagesizes="100vw" fetchpriority="high">');

fs.writeFileSync('docs/index.html', h);
console.log('podmian na stronie glownej: ' + swapped);
