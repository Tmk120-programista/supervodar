// availableLanguage is not a property of LocalBusiness/Plumber — schema.org
// defines it on ContactPoint and ServiceChannel. Moving it into a ContactPoint
// keeps the information and clears the validator warning.
import fs from 'node:fs';

const CONTACT_POINT = {
  '@type': 'ContactPoint',
  telephone: '+421940790083',
  contactType: 'customer service',
  areaServed: 'SK',
  availableLanguage: { '@type': 'Language', name: 'Slovak', alternateName: 'sk' },
};

// ---------- homepage ----------
const HOME = 'docs/index.html';
let h = fs.readFileSync(HOME, 'utf8');
const m = h.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
if (!m) throw new Error('brak JSON-LD na stronie glownej');

const doc = JSON.parse(m[1]);
let moved = 0;
for (const node of doc['@graph']) {
  if (node['@type'] === 'Plumber' && node.availableLanguage) {
    delete node.availableLanguage;
    node.contactPoint = CONTACT_POINT;
    moved++;
  }
}
if (moved) {
  h = h.replace(m[0], '<script type="application/ld+json">\n' + JSON.stringify(doc) + '\n</script>');
  fs.writeFileSync(HOME, h);
}
console.log('strona glowna: przeniesionych wezlow ' + moved);

// ---------- builder (provider reused by all 31 sub-pages) ----------
const B = 'tools/build-pages.mjs';
let b = fs.readFileSync(B, 'utf8');
const old = "  availableLanguage: { '@type': 'Language', name: 'Slovak', alternateName: 'sk' },";
const neu = "  contactPoint: {\n" +
  "    '@type': 'ContactPoint', telephone: TEL, contactType: 'customer service', areaServed: 'SK',\n" +
  "    availableLanguage: { '@type': 'Language', name: 'Slovak', alternateName: 'sk' },\n" +
  "  },";
if (b.includes(old)) {
  b = b.replace(old, neu);
  fs.writeFileSync(B, b);
  console.log('generator: availableLanguage przeniesiony do ContactPoint');
} else {
  console.error('NIE ZNALEZIONO availableLanguage w generatorze');
}
