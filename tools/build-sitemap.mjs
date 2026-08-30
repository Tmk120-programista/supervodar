// Generates sitemap.xml and robots.txt from the pages that actually exist.
// Canonicalised duplicates are left out — listing them would send Google a
// signal that contradicts their canonical tag.
import fs from 'node:fs';
import path from 'node:path';
import { SERVICES } from './content-services.mjs';
import { DISTRICTS } from './content-districts.mjs';

const DOCS = 'docs';
const SITE = 'https://supervodarba.sk';
const today = new Date().toISOString().slice(0, 10);

const urls = [{ loc: SITE + '/', pri: '1.0', freq: 'weekly' }];

for (const s of SERVICES) {
  if (s.canonical) continue;
  urls.push({ loc: SITE + '/' + s.slug + '/', pri: '0.8', freq: 'monthly' });
}
for (const d of DISTRICTS) {
  urls.push({ loc: SITE + '/' + d.slug + '/', pri: '0.7', freq: 'monthly' });
}

const missing = urls.filter((u) => {
  const slug = u.loc.replace(SITE + '/', '').replace(/\/$/, '');
  return !fs.existsSync(path.join(DOCS, slug, 'index.html')) && slug !== '';
});
if (missing.length) {
  console.error('W sitemape sa adresy bez pliku: ' + missing.map((m) => m.loc).join(', '));
  process.exit(1);
}

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) =>
    '  <url>\n' +
    '    <loc>' + u.loc + '</loc>\n' +
    '    <lastmod>' + today + '</lastmod>\n' +
    '    <changefreq>' + u.freq + '</changefreq>\n' +
    '    <priority>' + u.pri + '</priority>\n' +
    '  </url>'
  ).join('\n') +
  '\n</urlset>\n';

fs.writeFileSync(path.join(DOCS, 'sitemap.xml'), xml);

const robots =
  'User-agent: *\n' +
  'Allow: /\n\n' +
  'Sitemap: ' + SITE + '/sitemap.xml\n';
fs.writeFileSync(path.join(DOCS, 'robots.txt'), robots);

console.log('sitemap.xml: ' + urls.length + ' adresow');
console.log('robots.txt: gotowy');
