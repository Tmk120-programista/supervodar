// Builds every service and district page in the homepage's visual language.
// Shared chrome (header, contact, footer, CSS) comes from docs/index.html so the
// pages can never drift apart; everything above the contact block is unique copy.
import fs from 'node:fs';
import path from 'node:path';
import { SERVICES } from './content-services.mjs';
import { DISTRICTS } from './content-districts.mjs';

const DOCS = 'docs';
const SITE = 'https://supervodarba.sk';
const TEL = '+421940790083';
const TEL_TXT = '0940 790 083';
const home = fs.readFileSync(path.join(DOCS, 'index.html'), 'utf8');

const grab = (re, label) => {
  const m = home.match(re);
  if (!m) throw new Error('nie znaleziono w index.html: ' + label);
  return m[0];
};

const CSS = grab(/<style>[\s\S]*?<\/style>/, 'style');
const HEADER = grab(/<header class="hdr">[\s\S]*?<\/header>/, 'header');
// Anchor on the closing </ul>: the trust bar is the only block that ends that
// way, and a looser pattern silently swallowed the whole services section.
const TRUST = grab(/<div class="trust">[\s\S]*?<\/ul>\s*<\/div>\s*<\/div>/, 'trust');
const CONTACT = grab(/<section id="kontakt"[\s\S]*?<\/section>/, 'kontakt');
const FOOTER = grab(/<footer class="ft">[\s\S]*?<\/footer>/, 'footer');
const CALLBAR = grab(/<div class="callbar">[\s\S]*?<\/a>\s*<\/div>/, 'callbar');
const SCRIPT = grab(/<script>\s*\(function\(\)\{[\s\S]*?<\/script>/, 'script');

const EXTRA_CSS = `<style>
.crumb{font-size:13.5px;color:#bcd8ee;margin-bottom:14px}
.crumb a{color:#fff;text-decoration:none;font-weight:600}
.crumb a:hover{text-decoration:underline}
.crumb span{opacity:.7;padding:0 6px}
.prose p{color:#33454f;font-size:16px;line-height:1.75;margin:0 0 18px}
.linkgrid{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));margin-top:8px}
.linkcard{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid var(--line);
  border-radius:13px;padding:15px 17px;text-decoration:none;color:var(--navy);font-weight:700;
  font-size:15px;transition:border-color .15s,box-shadow .15s,transform .15s}
.linkcard:hover{border-color:var(--blue);box-shadow:0 10px 24px rgba(11,58,93,.1);transform:translateY(-2px)}
.linkcard svg{flex:none;color:var(--call)}
</style>`;

const PHONE_SVG = '<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z"/></svg>';
const ARROW = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>';
const CHECK = '<span class="ck"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7"/></svg></span>';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');

const ctaStrip = (line) =>
  `<div class="cta-strip"><p>${esc(line)}</p>` +
  `<a class="btn btn-call" href="tel:${TEL}">${PHONE_SVG} ${TEL_TXT}</a></div>`;

const faqBlock = (faq) =>
  `<div class="faq">` +
  faq.map(([q, a], i) =>
    `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><div class="ans">${esc(a)}</div></details>`
  ).join('\n') +
  `</div>`;

const svcBySlug = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));
const distBySlug = Object.fromEntries(DISTRICTS.map((d) => [d.slug, d]));

const linkCards = (items) =>
  `<div class="linkgrid">` +
  items.map(([href, label]) => `<a class="linkcard" href="${href}">${ARROW}${esc(label)}</a>`).join('\n') +
  `</div>`;

function head({ title, desc, slug, img, jsonld, canonical }) {
  const url = SITE + '/' + slug + '/';
  const imgUrl = SITE + '/' + img;
  return `<!DOCTYPE html>
<html lang="sk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${attr(title)}</title>
<meta name="description" content="${attr(desc)}">
<link rel="canonical" href="${canonical ? SITE + '/' + canonical + '/' : url}">
<meta name="geo.region" content="SK-BL">
<meta name="geo.placename" content="Bratislava">
<meta name="geo.position" content="48.1012402;17.1066393">
<meta property="og:type" content="website">
<meta property="og:locale" content="sk_SK">
<meta property="og:site_name" content="Super Vodár Bratislava">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(desc)}">
<meta property="og:image" content="${imgUrl}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(title)}">
<meta name="twitter:description" content="${attr(desc)}">
<meta name="twitter:image" content="${imgUrl}">
<link rel="icon" href="../favicon.ico">
<link rel="preload" as="image" href="../${img}" fetchpriority="high">
${CSS}
${EXTRA_CSS}
<script type="application/ld+json">
${JSON.stringify(jsonld)}
</script>
</head>
<body>
${HEADER.replace(/href="#top"/, 'href="../"')}
`;
}

function hero({ h1, lead, img, crumbLabel }) {
  return `<div class="hero" id="top">
  <img src="../${img}" alt="${attr(h1)} — Super Vodár Bratislava" fetchpriority="high">
  <div class="wrap">
    <nav class="crumb" aria-label="Omrvinková navigácia">
      <a href="../">Domov</a><span>›</span>${esc(crumbLabel)}
    </nav>
    <h1>${esc(h1)}</h1>
    <p class="sub">${esc(lead)}</p>
    <div class="cta-row">
      <a class="btn btn-call" href="tel:${TEL}">${PHONE_SVG} ${TEL_TXT}</a>
      <a class="btn btn-ghost" href="#kontakt">Napíšte nám</a>
    </div>
    <div class="hero-note">Dojazd k zákazníkovi v Bratislave je zadarmo</div>
  </div>
</div>
${TRUST}
`;
}

const tail = `${CONTACT}
${FOOTER}
${CALLBAR}
${SCRIPT}
</body>
</html>
`;

// ---------- service pages ----------
function buildService(s) {
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': SITE + '/' + s.slug + '/#service',
        name: s.h1,
        serviceType: s.nav,
        description: s.desc,
        url: SITE + '/' + s.slug + '/',
        areaServed: { '@type': 'City', name: 'Bratislava' },
        provider: {
          '@type': 'Plumber',
          '@id': SITE + '/#business',
          name: 'Super Vodár Bratislava',
          telephone: TEL,
          email: 'supervodarba@gmail.com',
          url: SITE + '/',
          address: { '@type': 'PostalAddress', addressLocality: 'Bratislava', addressCountry: 'SK' },
          geo: { '@type': 'GeoCoordinates', latitude: 48.1012402, longitude: 17.1066393 },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Domov', item: SITE + '/' },
          { '@type': 'ListItem', position: 2, name: s.nav, item: SITE + '/' + s.slug + '/' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: s.faq.map(([q, a]) => ({
          '@type': 'Question', name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  };

  const related = (s.related || []).filter((r) => svcBySlug[r])
    .map((r) => ['../' + r + '/', svcBySlug[r].nav]);
  const districts = DISTRICTS.slice(0, 8).map((d) => ['../' + d.slug + '/', 'Vodár ' + d.name]);

  return head({ title: s.title, desc: s.desc, slug: s.slug, img: s.img, jsonld, canonical: s.canonical })
    + hero({ h1: s.h1, lead: s.lead, img: s.img, crumbLabel: s.nav })
    + `<section>
  <div class="wrap">
    <div class="about">
      <div class="prose">
        <h2>${esc(s.h1)}</h2>
        ${s.intro.map((p) => `<p>${esc(p)}</p>`).join('\n        ')}
      </div>
      <div>
        <h3 style="font-size:18px;color:var(--navy);margin-bottom:14px">Kedy nás volajú</h3>
        <ul class="checks" style="grid-template-columns:1fr;margin-top:0">
          ${s.symptoms.map((x) => `<li>${CHECK}${esc(x)}</li>`).join('\n          ')}
        </ul>
      </div>
    </div>
    ${ctaStrip('Potrebujete túto službu? Zavolajte a poviem cenu vopred.')}
  </div>
</section>

<section class="tint slant">
  <div class="wrap">
    <h2>Časté otázky</h2>
    <p class="lead">Na čo sa nás pri tejto službe pýtate najčastejšie.</p>
    ${faqBlock(s.faq)}
  </div>
</section>

<section class="slant">
  <div class="wrap">
    <h2>Súvisiace služby</h2>
    <p class="lead" style="margin-bottom:22px">Často to riešime pri jednej návšteve spolu.</p>
    ${linkCards(related)}
    <h2 style="margin-top:46px">Kam chodíme</h2>
    <p class="lead" style="margin-bottom:22px">Túto službu robíme v celej Bratislave — pozrite si svoju mestskú časť.</p>
    ${linkCards(districts)}
    ${ctaStrip('Neviete si vybrať? Zavolajte a poradím.')}
  </div>
</section>

` + tail;
}

// ---------- district pages ----------
function buildDistrict(d) {
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': SITE + '/' + d.slug + '/#service',
        name: 'Vodár ' + d.name,
        serviceType: 'Vodoinštalatérske služby',
        description: d.desc,
        url: SITE + '/' + d.slug + '/',
        areaServed: {
          '@type': 'Place',
          name: d.name,
          address: { '@type': 'PostalAddress', addressLocality: 'Bratislava - ' + d.name, addressCountry: 'SK' },
        },
        provider: {
          '@type': 'Plumber',
          '@id': SITE + '/#business',
          name: 'Super Vodár Bratislava',
          telephone: TEL,
          email: 'supervodarba@gmail.com',
          url: SITE + '/',
          geo: { '@type': 'GeoCoordinates', latitude: 48.1012402, longitude: 17.1066393 },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Domov', item: SITE + '/' },
          { '@type': 'ListItem', position: 2, name: 'Vodár ' + d.name, item: SITE + '/' + d.slug + '/' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: d.faq.map(([q, a]) => ({
          '@type': 'Question', name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  };

  const h1 = 'Vodár ' + d.name + ' — inštalatér pre celú mestskú časť';
  const heroImg = svcBySlug[d.top[0]] ? svcBySlug[d.top[0]].img : SERVICES[0].img;
  const top = d.top.filter((t) => svcBySlug[t]).map((t) => ['../' + t + '/', svcBySlug[t].nav]);
  const near = (d.near || []).filter((n) => distBySlug[n]).map((n) => ['../' + n + '/', 'Vodár ' + distBySlug[n].name]);

  return head({ title: d.title, desc: d.desc, slug: d.slug, img: heroImg, jsonld })
    + hero({ h1, lead: d.lead, img: heroImg, crumbLabel: 'Vodár ' + d.name })
    + `<section>
  <div class="wrap">
    <div class="prose" style="max-width:74ch">
      <h2>Vodár a inštalatér pre ${esc(d.name)}</h2>
      ${d.intro.map((p) => `<p>${esc(p)}</p>`).join('\n      ')}
    </div>
    ${ctaStrip('Ste z ' + d.name + '? Zavolajte a dohodneme termín.')}
  </div>
</section>

<section class="tint slant">
  <div class="wrap">
    <h2>Čo tu robíme najčastejšie</h2>
    <p class="lead" style="margin-bottom:22px">Služby, na ktoré nás do tejto časti volajú opakovane.</p>
    ${linkCards(top)}
  </div>
</section>

<section class="slant">
  <div class="wrap">
    <h2>Časté otázky</h2>
    <p class="lead">Čo sa nás pýtajú zákazníci z tejto mestskej časti.</p>
    ${faqBlock(d.faq)}
    ${near.length ? `<h2 style="margin-top:46px">Susedné mestské časti</h2>
    <p class="lead" style="margin-bottom:22px">Jazdíme po celej Bratislave — dojazd je vždy zadarmo.</p>
    ${linkCards(near)}` : ''}
    ${ctaStrip('Zavolajte a poviem cenu ešte pred príchodom.')}
  </div>
</section>

` + tail;
}

// ---------- write ----------
let n = 0;
for (const s of SERVICES) {
  fs.mkdirSync(path.join(DOCS, s.slug), { recursive: true });
  fs.writeFileSync(path.join(DOCS, s.slug, 'index.html'), buildService(s));
  n++;
}
for (const d of DISTRICTS) {
  fs.mkdirSync(path.join(DOCS, d.slug), { recursive: true });
  fs.writeFileSync(path.join(DOCS, d.slug, 'index.html'), buildDistrict(d));
  n++;
}
console.log('wygenerowanych stron: ' + n + ' (' + SERVICES.length + ' uslug + ' + DISTRICTS.length + ' dzielnic)');
