// On sub-pages the business was only defined inside Service.provider, so
// validators showed it nested instead of as its own entity, and FAQPage had no
// @id. Every entity is now declared once at the top level and referenced by @id
// — the same shape the homepage already used.
import fs from 'node:fs';

const B = 'tools/build-pages.mjs';
let b = fs.readFileSync(B, 'utf8');
let n = 0;

const swaps = [
  // a bare reference used wherever the business is mentioned
  [
    "const crumbs = (name, slug) => ({",
    "const providerRef = { '@id': SITE + '/#business' };\n\nconst crumbs = (name, slug) => ({",
  ],
  // FAQPage gains an @id like every other node
  [
    "const faqLd = (faq) => ({\n  '@type': 'FAQPage',",
    "const faqLd = (faq, slug) => ({\n  '@type': 'FAQPage',\n  '@id': SITE + '/' + slug + '/#faq',",
  ],
  ['faqLd(s.faq),', 'faqLd(s.faq, s.slug),'],
  ['faqLd(allFaq),', 'faqLd(allFaq, d.slug),'],
  // the business becomes the first top-level node of each sub-page graph
  [
    "    '@graph': [\n      {\n        '@type': 'Service', '@id': SITE + '/' + s.slug + '/#service',",
    "    '@graph': [\n      provider,\n      {\n        '@type': 'Service', '@id': SITE + '/' + s.slug + '/#service',",
  ],
  [
    "    '@graph': [\n      {\n        '@type': 'Service', '@id': SITE + '/' + d.slug + '/#service',",
    "    '@graph': [\n      provider,\n      {\n        '@type': 'Service', '@id': SITE + '/' + d.slug + '/#service',",
  ],
  // …and Service points at it rather than repeating the whole object
  ["        provider,\n      },\n      crumbs(s.nav, s.slug),", "        provider: providerRef,\n      },\n      crumbs(s.nav, s.slug),"],
  ["        provider,\n      },\n      crumbs('Vodár ' + d.name, d.slug),", "        provider: providerRef,\n      },\n      crumbs('Vodár ' + d.name, d.slug),"],
];

for (const [from, to] of swaps) {
  if (b.includes(from)) { b = b.replace(from, to); n++; }
  else console.error('NIE ZNALEZIONO: ' + from.replace(/\n/g, ' ').slice(0, 62));
}

// the 404 page builds its graph from [provider] directly — keep it valid
b = b.replace("'@graph': [provider] }", "'@graph': [provider] }");

fs.writeFileSync(B, b);
console.log('zastosowanych zmian: ' + n + '/' + swaps.length);
