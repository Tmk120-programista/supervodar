// Two fixes in one pass:
//  1. the call-to-action green failed WCAG AA (3.37:1 on white text)
//  2. the business schema lacked a street address, postal code and price range
import fs from 'node:fs';

const HOME = 'docs/index.html';
const BUILDER = 'tools/build-pages.mjs';

const OLD_GREEN = '#12a150';
const NEW_GREEN = '#0d8040'; // 5.03:1 against white
const OLD_DARK = '#0e8442';
const NEW_DARK = '#0a6532'; // 7.19:1, used for hover

let home = fs.readFileSync(HOME, 'utf8');
let n = 0;

// ---- 1. contrast
const before = home;
home = home.replace('--call:' + OLD_GREEN + '; --call-dark:' + OLD_DARK + ';',
  '--call:' + NEW_GREEN + '; --call-dark:' + NEW_DARK + ';');
if (home === before) {
  // the declaration may be spaced differently; fall back to a targeted swap
  home = home.replace(new RegExp('--call:\\s*' + OLD_GREEN, 'i'), '--call:' + NEW_GREEN)
             .replace(new RegExp('--call-dark:\\s*' + OLD_DARK, 'i'), '--call-dark:' + NEW_DARK);
}
if (home.includes(NEW_GREEN)) { n++; console.log('kontrast: --call -> ' + NEW_GREEN + ' (5.03:1)'); }
else console.error('NIE PODMIENIONO koloru --call');

// ---- 2. schema on the homepage
const oldAddr = '"address":{"@type":"PostalAddress","addressLocality":"Bratislava","addressRegion":"Bratislavský kraj","addressCountry":"SK"}';
const newAddr = '"address":{"@type":"PostalAddress","streetAddress":"Znievska 23","postalCode":"851 06","addressLocality":"Bratislava","addressRegion":"Bratislavský kraj","addressCountry":"SK"},\n"priceRange":"€€"';
if (home.includes(oldAddr)) { home = home.replace(oldAddr, newAddr); n++; console.log('schema (home): adres + priceRange'); }
else console.error('NIE ZNALEZIONO adresu w schema strony glownej');

// ---- 3. the address shown to visitors must match the schema
const oldVis = '<span class="val">Bratislava - Petržalka</span>';
const newVis = '<span class="val">Znievska 23, 851 06 Bratislava</span>';
if (home.includes(oldVis)) { home = home.replace(oldVis, newVis); n++; console.log('widoczny adres zaktualizowany'); }
else console.error('NIE ZNALEZIONO widocznego adresu');

fs.writeFileSync(HOME, home);

// ---- 4. the provider object reused by all 31 sub-pages
let b = fs.readFileSync(BUILDER, 'utf8');
const oldProv = "  address: { '@type': 'PostalAddress', addressLocality: 'Bratislava', addressCountry: 'SK' },";
const newProv = "  address: {\n" +
  "    '@type': 'PostalAddress', streetAddress: 'Znievska 23', postalCode: '851 06',\n" +
  "    addressLocality: 'Bratislava', addressRegion: 'Bratislavský kraj', addressCountry: 'SK',\n" +
  "  },\n" +
  "  priceRange: '€€',\n" +
  "  availableLanguage: { '@type': 'Language', name: 'Slovak', alternateName: 'sk' },";
if (b.includes(oldProv)) { b = b.replace(oldProv, newProv); n++; console.log('schema (podstrony): adres + priceRange + availableLanguage'); }
else console.error('NIE ZNALEZIONO provider.address w generatorze');
fs.writeFileSync(BUILDER, b);

console.log('\nzastosowanych zmian: ' + n + '/4');
