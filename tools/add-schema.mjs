// Injects schema.org JSON-LD into every page and repairs the social-share meta.
// Every value below is taken from what the pages actually say — nothing invented.
// Idempotent: safe to re-run after a re-mirror.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.argv[2] || 'docs');
const SITE = 'https://supervodarba.sk';
const BUSINESS_ID = SITE + '/#business';
const OG_IMAGE =
  SITE +
  '/cdn-assets/cdn.bitrix24.pl/b20237281/landing/112/11299f9167a3ce68d4b4d8fbe5b45d6d/AdobeStock_382341959_1x_1_11zon_1x.webp';

const NAME = 'Super Vodár Bratislava';
const DESC =
  'Super Vodár Bratislava - spoľahlivé vodoinštalačne služby v Bratislave. 100% záruka spokojnosti, všetky inštalatérske služby na jednom mieste.';
const PHONE = '+421940790083';
const EMAIL = 'supervodarba@gmail.com';
const GOOGLE = 'https://g.page/r/CXU_r42LG3I4EA0';

// Bratislava boroughs that have their own landing page.
const DISTRICTS = {
  cunovo: 'Čunovo',
  devin: 'Devín',
  devinskanovaves: 'Devínska Nová Ves',
  dubravka: 'Dúbravka',
  jarovce: 'Jarovce',
  karlovaves: 'Karlova Ves',
  lamac: 'Lamač',
  novemesto: 'Nové Mesto',
  petrzalka: 'Petržalka',
  podunajskebiskupice: 'Podunajské Biskupice',
  raca: 'Rača',
  rusovce: 'Rusovce',
  ruzinov: 'Ružinov',
  staremesto: 'Staré Mesto',
  vajnory: 'Vajnory',
  vrakuna: 'Vrakuňa',
  zahorskabystrica: 'Záhorská Bystrica',
};

// Service names, normalised from each page's own H1.
const SERVICES = {
  Krtkovanie: 'Krtkovanie upchatého potrubia',
  WC: 'Oprava a výmena WC',
  bojler: 'Montáž a výmena bojlerov a prietokových ohrievačov',
  cerpadla: 'Montáž, oprava, výmena a servis čerpadiel',
  geberit: 'Oprava splachovača Geberit',
  kurenie: 'Montáž a servis kúrenia',
  montazbaterii: 'Montáž a výmena batérie',
  montazdrezu: 'Montáž drezu a umývadla',
  prackaumyvacka: 'Montáž práčky alebo umývačky riadu',
  prackaumyvacka_wemr: 'Montáž práčky alebo umývačky riadu',
  sifon: 'Montáž a výmena sifónu',
  silikonovanie: 'Silikónovanie',
  sprchovekuty: 'Výmena a montáž sprchového kúta',
  ventily: 'Výmena a montáž ventilov',
};

const business = {
  '@type': 'Plumber',
  '@id': BUSINESS_ID,
  name: NAME,
  description: DESC,
  url: SITE + '/',
  telephone: PHONE,
  email: EMAIL,
  image: OG_IMAGE,
  sameAs: [GOOGLE],
  // No street address is published anywhere on the site: this is a
  // call-out business, so only the city is asserted.
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bratislava',
    addressCountry: 'SK',
  },
  areaServed: { '@type': 'City', name: 'Bratislava' },
  availableLanguage: { '@type': 'Language', name: 'Slovak', alternateName: 'sk' },
  // The site states 00:00-23:59 for every day of the week.
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
};

function breadcrumb(name, slug) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Domov', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name, item: SITE + '/' + slug + '/' },
    ],
  };
}

function graphFor(slug) {
  if (slug === '') {
    return [
      business,
      {
        '@type': 'WebSite',
        '@id': SITE + '/#website',
        url: SITE + '/',
        name: NAME,
        inLanguage: 'sk',
        publisher: { '@id': BUSINESS_ID },
      },
    ];
  }

  if (DISTRICTS[slug]) {
    const d = DISTRICTS[slug];
    return [
      {
        '@type': 'Service',
        '@id': SITE + '/' + slug + '/#service',
        name: 'Vodár ' + d,
        serviceType: 'Vodoinštalatérske služby',
        provider: { '@id': BUSINESS_ID },
        areaServed: {
          '@type': 'Place',
          name: d,
          address: { '@type': 'PostalAddress', addressLocality: 'Bratislava - ' + d, addressCountry: 'SK' },
        },
        url: SITE + '/' + slug + '/',
      },
      breadcrumb('Vodár ' + d, slug),
    ];
  }

  if (SERVICES[slug]) {
    const s = SERVICES[slug];
    return [
      {
        '@type': 'Service',
        '@id': SITE + '/' + slug + '/#service',
        name: s,
        serviceType: s,
        provider: { '@id': BUSINESS_ID },
        areaServed: { '@type': 'City', name: 'Bratislava' },
        url: SITE + '/' + slug + '/',
      },
      breadcrumb(s, slug),
    ];
  }
  return null;
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name === 'index.html') out.push(full);
  }
  return out;
}

const stats = { schema: 0, og: 0, skipped: [] };

for (const file of walk(ROOT)) {
  const slug = path.relative(ROOT, file).replace(/\\/g, '/').replace(/\/?index\.html$/, '');
  const graph = graphFor(slug);
  if (!graph) {
    stats.skipped.push(slug || '(root)');
    continue;
  }

  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  const jsonld =
    '<script type="application/ld+json" id="sv-schema">' +
    JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) +
    '</script>';

  html = html.replace(/\s*<script type="application\/ld\+json" id="sv-schema">[\s\S]*?<\/script>/i, '');
  html = html.replace(/<\/head>/i, jsonld + '\n</head>');
  stats.schema++;

  // The mirrored og:/twitter: image pointed at a Bitrix demo placeholder and
  // used a relative path, which social crawlers cannot resolve.
  const pageUrl = SITE + '/' + (slug ? slug + '/' : '');
  const ogFixed = html
    .replace(/(<meta property="(?:og|twitter):image" content=")[^"]*(")/gi, '$1' + OG_IMAGE + '$2')
    .replace(/(<meta property="og:url" content=")[^"]*(")/gi, '$1' + pageUrl + '$2');
  if (ogFixed !== html) stats.og++;
  html = ogFixed;

  if (!/property="og:url"/i.test(html)) {
    html = html.replace(/<meta property="og:type"/i, '<meta property="og:url" content="' + pageUrl + '" />\n<meta property="og:type"');
  }

  if (html !== before) fs.writeFileSync(file, html);
}

console.log('stron ze schema:      ' + stats.schema);
console.log('naprawionych og:image: ' + stats.og);
if (stats.skipped.length) console.log('POMINIETE: ' + stats.skipped.join(', '));
