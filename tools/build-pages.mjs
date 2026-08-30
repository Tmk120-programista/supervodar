// Builds every service and district page in the homepage's visual language.
// Shared chrome (header, contact, footer, CSS) comes from docs/index.html so the
// pages can never drift apart; everything between hero and contact is unique.
import fs from 'node:fs';
import path from 'node:path';
import { SERVICES } from './content-services.mjs';
import { DISTRICTS } from './content-districts.mjs';
import { SERVICE_EXTRA, DISTRICT_EXTRA, REVIEWS, DECL } from './content-extra.mjs';
import { DEEP } from './content-districts-deep.mjs';

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
// Anchor on the closing </ul>: a looser pattern silently swallowed the whole
// services section and duplicated it onto every sub-page.
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
.prose h2{margin-bottom:16px}
.stepnum{font-size:30px;font-weight:800;letter-spacing:-.02em}
.revs.static{display:grid;grid-template-columns:repeat(3,1fr);overflow:visible}
@media(max-width:940px){.revs.static{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.revs.static{grid-template-columns:1fr}}
.revs.static .rev{flex:none}
.probs{display:grid;gap:18px;grid-template-columns:repeat(3,1fr);margin-top:8px}
@media(max-width:940px){.probs{grid-template-columns:1fr}}
.prob{background:#fff;border:1px solid var(--line);border-radius:16px;padding:26px 24px;
  box-shadow:0 8px 22px rgba(11,58,93,.07);border-top:4px solid var(--blue)}
.prob h3{font-size:17px;color:var(--navy);margin:0 0 10px;line-height:1.3}
.prob p{margin:0;color:var(--muted);font-size:14.5px;line-height:1.65}
</style>`;

const PHONE_SVG = '<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z"/></svg>';
const CHECK = '<span class="ck"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7"/></svg></span>';
const GLOGO = 'cdn-assets/cdn.bitrix24.pl/b20237281/landing/f40/f40bf46204c63154383175299cefcbb8/985_google_g_icon_1x_11zon_2x.webp';
const AVCOL = ['#0b3a5d', '#12a150', '#12507d', '#b4651a', '#6d3d8c', '#1d6ea8'];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');

const svcBySlug = Object.fromEntries(SERVICES.map((s) => [s.slug, s]));
const distBySlug = Object.fromEntries(DISTRICTS.map((d) => [d.slug, d]));

const ctaStrip = (line) =>
  `<div class="cta-strip"><p>${esc(line)}</p>` +
  `<a class="btn btn-call" href="tel:${TEL}">${PHONE_SVG} ${TEL_TXT}</a></div>`;

const faqBlock = (faq) =>
  `<div class="faq">` +
  faq.map(([q, a], i) =>
    `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><div class="ans">${esc(a)}</div></details>`
  ).join('\n') + `</div>`;

const flowBlock = (steps) =>
  `<ol class="flow">` +
  steps.map(([t, d], i) =>
    `<li><div class="fic"><span class="stepnum">${i + 1}</span></div>` +
    `<h3>${esc(t)}</h3><p>${esc(d)}</p></li>`
  ).join('\n') + `</ol>`;

const checkGrid = (items) =>
  `<ul class="checks">` +
  items.map((x) => `<li>${CHECK}${esc(x)}</li>`).join('\n') + `</ul>`;

const svcCards = (slugs) =>
  `<div class="grid">` +
  slugs.filter((s) => svcBySlug[s]).map((s) => {
    const x = svcBySlug[s];
    return `<a class="svc" href="../${x.slug}/">` +
      `<img src="../${x.img}" alt="${attr(x.nav)} — vodár Bratislava" loading="lazy" width="400" height="152">` +
      `<div class="tx"><h3>${esc(x.nav)}</h3><p>${esc(x.lead)}</p></div></a>`;
  }).join('\n') + `</div>`;

const chips = (items) =>
  `<div class="chips">` +
  items.map(([href, label]) => `<a class="chip" href="${href}">${esc(label)}</a>`).join('\n') +
  `</div>`;

function reviewCards(list) {
  return `<div class="revs static">` + list.map((r, i) =>
    `<article class="rev">` +
    `<div class="revtop"><div class="stars" aria-label="Hodnotenie 5 z 5">★★★★★</div>` +
    `<img class="gmark" src="../${GLOGO}" alt="Hodnotenie na Google" loading="lazy" width="19" height="19"></div>` +
    `<p>${esc(r.text)}</p>` +
    `<div class="revwho"><span class="avat" style="background:${AVCOL[i % AVCOL.length]}">${esc(r.name.charAt(0))}</span>` +
    `<span><b>${esc(r.name)}</b><span>${esc(r.district)}</span></span></div></article>`
  ).join('\n') + `</div>`;
}

const PRICE_PANEL = `<div class="pricepanel">
  <div class="pitem free">
    <div class="pic"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 7h-3V6a3 3 0 0 0-3-3H5a2 2 0 0 0-2 2v10h2a3 3 0 0 0 6 0h2a3 3 0 0 0 6 0h2v-5l-2-3Zm-1 2 1.5 2H16V9h2ZM8 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/></svg></div>
    <h3>Dojazd</h3><div class="val">Zadarmo</div>
    <p class="desc">Dojazd k zákazníkovi v Bratislave</p>
  </div>
  <div class="pitem free">
    <div class="pic"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/><path d="m9.2 14.4 1.9 1.9 3.7-3.9"/></svg></div>
    <h3>Cenová ponuka</h3><div class="val">Zadarmo</div>
    <p class="desc">Nezáväzne a vopred po telefóne</p>
  </div>
  <div class="pitem">
    <div class="pic"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2.5" width="16" height="19" rx="2.5"/><path d="M8 7h8M8 11.5h3M8 15.5h3M15 11.5h1M15 15.5h1"/></svg></div>
    <h3>Cenník</h3><div class="val">Individuálna cena</div>
    <p class="desc">Podľa druhu a rozsahu práce</p>
  </div>
</div>`;

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

const provider = {
  '@type': 'Plumber', '@id': SITE + '/#business', name: 'Super Vodár Bratislava',
  telephone: TEL, email: 'supervodarba@gmail.com', url: SITE + '/',
  address: { '@type': 'PostalAddress', addressLocality: 'Bratislava', addressCountry: 'SK' },
  geo: { '@type': 'GeoCoordinates', latitude: 48.1012402, longitude: 17.1066393 },
};

const crumbs = (name, slug) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Domov', item: SITE + '/' },
    { '@type': 'ListItem', position: 2, name, item: SITE + '/' + slug + '/' },
  ],
});

const faqLd = (faq) => ({
  '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({
    '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

// pick reviews relevant to this page, topped up so there are always three
function pickReviews(match) {
  const hit = REVIEWS.filter(match);
  const rest = REVIEWS.filter((r) => !hit.includes(r));
  return hit.concat(rest).slice(0, 3);
}

// ---------- service pages ----------
function buildService(s) {
  const x = SERVICE_EXTRA[s.slug];
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service', '@id': SITE + '/' + s.slug + '/#service',
        name: s.h1, serviceType: s.nav, description: s.desc,
        url: SITE + '/' + s.slug + '/',
        areaServed: { '@type': 'City', name: 'Bratislava' },
        provider,
      },
      crumbs(s.nav, s.slug),
      faqLd(s.faq),
    ],
  };

  const revs = pickReviews((r) => r.services.includes(s.slug));
  const districtChips = DISTRICTS.map((d) => ['../' + d.slug + '/', 'Vodár ' + d.name]);

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
          ${s.symptoms.map((v) => `<li>${CHECK}${esc(v)}</li>`).join('\n          ')}
        </ul>
      </div>
    </div>
    ${ctaStrip('Potrebujete túto službu? Zavolajte a poviem cenu vopred.')}
  </div>
</section>

<section class="tint slant">
  <div class="wrap">
    <h2>Ako postupujeme</h2>
    <p class="lead" style="margin-bottom:40px">Tri kroky od zavolania po hotovú prácu.</p>
    ${flowBlock(x.process)}
  </div>
</section>

<section class="slant">
  <div class="wrap">
    <div class="about">
      <div class="prose">
        <h2>Čo je v cene</h2>
        <p>Cenu poviem vopred po tom, ako mi problém opíšete. Nasledujúce veci sú v nej vždy zahrnuté — nedoúčtovávame ich dodatočne.</p>
        ${checkGrid(x.included)}
      </div>
      <div>
        <h3 style="font-size:18px;color:var(--navy);margin-bottom:14px">Orientačne</h3>
        <p style="color:var(--muted);font-size:15px;line-height:1.65">Dojazd aj cenová ponuka sú zadarmo. Samotná práca sa oceňuje individuálne, pretože rozdiel medzi drobnou opravou a väčším zásahom býva zásadný.</p>
      </div>
    </div>
  </div>
</section>

<section class="warm slant">
  <div class="wrap">
    <h2>Cenník</h2>
    <p class="lead">Za dojazd ani za obhliadku u nás neplatíte.</p>
    ${PRICE_PANEL}
    ${ctaStrip('Cenu poviem vopred — stačí zavolať.')}
  </div>
</section>

<section class="slant">
  <div class="wrap">
    <h2>Skúsenosti zákazníkov</h2>
    <p class="lead" style="margin-bottom:26px">Hodnotenia z Google od ľudí z Bratislavy.</p>
    ${reviewCards(revs)}
    <p style="margin-top:22px"><a href="https://maps.app.goo.gl/zRfGkkv5mKgjxqGj6" target="_blank" rel="noopener" style="color:var(--navy-2);font-weight:700">Pozrite si všetky hodnotenia na Google →</a></p>
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
    <p class="lead" style="margin-bottom:24px">Často to riešime pri jednej návšteve spolu.</p>
    ${svcCards(s.related || [])}
    <h2 style="margin-top:50px">Kam s touto službou chodíme</h2>
    <p class="lead" style="margin-bottom:8px">Robíme ju v celej Bratislave — vyberte svoju mestskú časť.</p>
    ${chips(districtChips)}
    ${ctaStrip('Neviete si vybrať? Zavolajte a poradím.')}
  </div>
</section>

` + tail;
}

// ---------- district pages ----------
function buildDistrict(d) {
  const local = DISTRICT_EXTRA[d.slug] || [];
  const dc = DECL[d.slug];
  const deep = DEEP[d.slug];
  const allFaq = d.faq.concat(deep.faqMore);
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service', '@id': SITE + '/' + d.slug + '/#service',
        name: 'Vodár ' + d.name, serviceType: 'Vodoinštalatérske služby',
        description: d.desc, url: SITE + '/' + d.slug + '/',
        areaServed: {
          '@type': 'Place', name: d.name,
          address: { '@type': 'PostalAddress', addressLocality: 'Bratislava - ' + d.name, addressCountry: 'SK' },
        },
        provider,
      },
      crumbs('Vodár ' + d.name, d.slug),
      faqLd(allFaq),
    ],
  };

  const h1 = 'Vodár ' + d.name + ' — inštalatér pre celú mestskú časť';
  const heroImg = svcBySlug[d.top[0]] ? svcBySlug[d.top[0]].img : SERVICES[0].img;
  const revs = pickReviews((r) => r.slugD === d.slug);
  const hasLocal = REVIEWS.some((r) => r.slugD === d.slug);
  const near = (d.near || []).filter((n) => distBySlug[n]).map((n) => ['../' + n + '/', 'Vodár ' + distBySlug[n].name]);

  return head({ title: d.title, desc: d.desc, slug: d.slug, img: heroImg, jsonld })
    + hero({ h1, lead: d.lead, img: heroImg, crumbLabel: 'Vodár ' + d.name })
    + `<section>
  <div class="wrap">
    <div class="about">
      <div class="prose">
        <h2>Vodár a inštalatér pre ${esc(dc.acc)}</h2>
        ${d.intro.map((p) => `<p>${esc(p)}</p>`).join('\n        ')}
      </div>
      <div>
        <h3 style="font-size:18px;color:var(--navy);margin-bottom:14px">S čím sem chodíme</h3>
        <ul class="checks" style="grid-template-columns:1fr;margin-top:0">
          ${local.map((v) => `<li>${CHECK}${esc(v)}</li>`).join('\n          ')}
        </ul>
      </div>
    </div>
    ${ctaStrip('Ste z ' + dc.gen + '? Zavolajte a dohodneme termín.')}
  </div>
</section>

<section class="slant">
  <div class="wrap">
    <h2>Typické problémy v tejto mestskej časti</h2>
    <p class="lead" style="margin-bottom:24px">Čo sa v miestnej zástavbe opakuje najčastejšie — a prečo.</p>
    <div class="probs">
      ${deep.problems.map(([t, x]) => '<article class="prob"><h3>' + esc(t) + '</h3><p>' + esc(x) + '</p></article>').join('\n      ')}
    </div>
  </div>
</section>

<section class="tint slant">
  <div class="wrap">
    <h2>Služby, na ktoré nás sem volajú</h2>
    <p class="lead" style="margin-bottom:24px">Kliknite na službu a dozviete sa, ako pri nej postupujeme.</p>
    ${svcCards(d.top)}
  </div>
</section>

<section class="slant">
  <div class="wrap">
    <h2>Ako to u vás prebieha</h2>
    <p class="lead" style="margin-bottom:40px">Rovnako v každej mestskej časti — bez obhliadok navyše a bez ceny, ktorá sa mení až na faktúre.</p>
    ${flowBlock([
      ['Zavoláte', 'Opíšete, čo sa deje. Podľa toho viem povedať, čo sa dá vyriešiť na mieste a čo si vyžiada náhradný diel.'],
      ['Dohodneme cenu a termín', 'Cenu poviem ešte pred príchodom. Termín si dohodneme tak, aby vám sedel.'],
      ['Prídeme a opravíme', 'Dorazíme do ' + dc.gen + ', prácu spravíme na mieste a po sebe upraceme.'],
    ])}
  </div>
</section>

<section class="warm slant">
  <div class="wrap">
    <h2>Cenník pre ${esc(dc.acc)}</h2>
    <p class="lead">Dojazd do tejto mestskej časti je zadarmo, rovnako ako kamkoľvek inam v Bratislave.</p>
    ${PRICE_PANEL}
    ${ctaStrip('Zavolajte a poviem cenu ešte pred príchodom.')}
  </div>
</section>

<section class="slant">
  <div class="wrap">
    <h2>${hasLocal ? 'Hodnotenie priamo z ' + esc(dc.gen) : 'Skúsenosti zákazníkov'}</h2>
    <p class="lead" style="margin-bottom:26px">${hasLocal
      ? 'Jedno z hodnotení na Google pochádza priamo z tejto mestskej časti.'
      : 'Hodnotenia z Google od zákazníkov z Bratislavy.'}</p>
    ${reviewCards(revs)}
    <p style="margin-top:22px"><a href="https://maps.app.goo.gl/zRfGkkv5mKgjxqGj6" target="_blank" rel="noopener" style="color:var(--navy-2);font-weight:700">Pozrite si všetky hodnotenia na Google →</a></p>
  </div>
</section>

<section class="tint slant">
  <div class="wrap">
    <h2>Časté otázky</h2>
    <p class="lead">Čo sa nás pýtajú zákazníci z tejto mestskej časti.</p>
    ${faqBlock(allFaq)}
    ${near.length ? `<h2 style="margin-top:46px">Susedné mestské časti</h2>
    <p class="lead" style="margin-bottom:8px">Jazdíme po celej Bratislave — dojazd je vždy zadarmo.</p>
    ${chips(near)}` : ''}
    ${ctaStrip('Potrebujete vodára ešte dnes?')}
  </div>
</section>

` + tail;
}

// ---------- write ----------
let n = 0;
for (const s of SERVICES) {
  if (!SERVICE_EXTRA[s.slug]) throw new Error('chybia dodatocne data pre sluzbu: ' + s.slug);
  fs.mkdirSync(path.join(DOCS, s.slug), { recursive: true });
  fs.writeFileSync(path.join(DOCS, s.slug, 'index.html'), buildService(s));
  n++;
}
for (const d of DISTRICTS) {
  if (!DISTRICT_EXTRA[d.slug]) throw new Error('chybia dodatocne data pre mestsku cast: ' + d.slug);
  if (!DECL[d.slug]) throw new Error('chybia tvary skloňovania pre: ' + d.slug);
  if (!DEEP[d.slug]) throw new Error('chybia rozsirene texty pre: ' + d.slug);
  fs.mkdirSync(path.join(DOCS, d.slug), { recursive: true });
  fs.writeFileSync(path.join(DOCS, d.slug, 'index.html'), buildDistrict(d));
  n++;
}
console.log('wygenerowanych stron: ' + n + ' (' + SERVICES.length + ' uslug + ' + DISTRICTS.length + ' dzielnic)');
