// Adds the WebPage node that tied the graph together — it was the one type
// genuinely missing. Every page now declares what it is, which site it belongs
// to, which business it is about and which breadcrumb leads to it.
import fs from 'node:fs';

const SITE = 'https://supervodarba.sk';
const TODAY = new Date().toISOString().slice(0, 10);

// ---------- homepage ----------
let home = fs.readFileSync('docs/index.html', 'utf8');
const m = home.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
if (!m) throw new Error('nie znaleziono JSON-LD na stronie glownej');

const graph = JSON.parse(m[1])['@graph'];
if (!graph.some((n) => n['@type'] === 'WebPage')) {
  const faq = graph.find((n) => n['@type'] === 'FAQPage');
  if (faq) faq['@id'] = SITE + '/#faq';

  graph.splice(2, 0, {
    '@type': 'WebPage',
    '@id': SITE + '/#webpage',
    url: SITE + '/',
    name: (home.match(/<title>([^<]*)/) || [, ''])[1],
    description: (home.match(/name="description" content="([^"]*)/) || [, ''])[1],
    inLanguage: 'sk',
    isPartOf: { '@id': SITE + '/#website' },
    about: { '@id': SITE + '/#business' },
    primaryImageOfPage: { '@type': 'ImageObject', url: SITE + '/img/hero-1920.webp' },
    dateModified: TODAY,
  });
  home = home.replace(m[0],
    '<script type="application/ld+json">\n' +
    JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) +
    '\n</script>');
  fs.writeFileSync('docs/index.html', home);
  console.log('strona glowna: dodany WebPage');
} else {
  console.log('strona glowna: WebPage juz jest');
}

// ---------- generator for the 31 sub-pages ----------
let b = fs.readFileSync('tools/build-pages.mjs', 'utf8');

// give the breadcrumb an @id so WebPage can point at it
const oldCrumbs = "const crumbs = (name, slug) => ({\n  '@type': 'BreadcrumbList',";
const newCrumbs = "const crumbs = (name, slug) => ({\n  '@type': 'BreadcrumbList',\n  '@id': SITE + '/' + slug + '/#breadcrumb',";
if (b.includes(oldCrumbs)) b = b.replace(oldCrumbs, newCrumbs);
else console.error('NIE ZNALEZIONO crumbs()');

// a WebPage + a minimal WebSite so the graph resolves without the homepage
const helper = `
const TODAY_BUILD = new Date().toISOString().slice(0, 10);

// Ties a sub-page into the site graph: what it is, where it sits, what it is about.
const webPage = (slug, title, desc, img) => ([
  {
    '@type': 'WebPage',
    '@id': SITE + '/' + slug + '/#webpage',
    url: SITE + '/' + slug + '/',
    name: title,
    description: desc,
    inLanguage: 'sk',
    isPartOf: { '@id': SITE + '/#website' },
    about: { '@id': SITE + '/#business' },
    breadcrumb: { '@id': SITE + '/' + slug + '/#breadcrumb' },
    primaryImageOfPage: { '@type': 'ImageObject', url: SITE + '/' + img },
    dateModified: TODAY_BUILD,
  },
  {
    '@type': 'WebSite',
    '@id': SITE + '/#website',
    url: SITE + '/',
    name: 'Super Vodár Bratislava',
    inLanguage: 'sk',
    publisher: { '@id': SITE + '/#business' },
  },
]);
`;
if (!b.includes('const webPage =')) {
  b = b.replace("const crumbs = (name, slug) => ({", helper + "\nconst crumbs = (name, slug) => ({");
}

// wire it into both page builders
const svcOld = `      crumbs(s.nav, s.slug),
      faqLd(s.faq),`;
const svcNew = `      crumbs(s.nav, s.slug),
      faqLd(s.faq),
      ...webPage(s.slug, s.title, s.desc, s.hero || s.img),`;
if (b.includes(svcOld)) b = b.replace(svcOld, svcNew);
else console.error('NIE ZNALEZIONO grafu uslugi');

const distOld = `      crumbs('Vodár ' + d.name, d.slug),
      faqLd(allFaq),`;
const distNew = `      crumbs('Vodár ' + d.name, d.slug),
      faqLd(allFaq),
      ...webPage(d.slug, d.title, d.desc, heroImg),`;
if (b.includes(distOld)) b = b.replace(distOld, distNew);
else console.error('NIE ZNALEZIONO grafu dzielnicy');

fs.writeFileSync('tools/build-pages.mjs', b);
console.log('generator: WebPage + WebSite podpiete do obu typow podstron');
