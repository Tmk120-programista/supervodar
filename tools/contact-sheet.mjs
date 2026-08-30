// Builds a labelled contact sheet of the site's photos so they can be reviewed at a glance.
import fs from 'node:fs';
import path from 'node:path';

const DOCS = path.resolve('docs');
const OUT = process.argv[2];
const base = path.join(DOCS, 'cdn-assets', 'cdn.bitrix24.pl');

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f);
    else if (/\.(webp|jpg|jpeg|png)$/i.test(e.name)) files.push(f);
  }
})(base);

// Collapse the 1x/2x variants of the same photo down to one entry.
const seen = new Set();
const picked = [];
for (const f of files.sort()) {
  const key = path.basename(f).replace(/_(1x|2x)(_11zon)?(_1x|_2x)?\.(webp|jpg|png)$/i, '');
  if (seen.has(key)) continue;
  seen.add(key);
  picked.push(f);
}

const cards = picked
  .map((f, i) => {
    const url = 'file:///' + f.replace(/\\/g, '/');
    const label = i + 1 + '. ' + path.basename(f).slice(0, 30);
    return '<figure><img src="' + url + '"><figcaption>' + label + '</figcaption></figure>';
  })
  .join('');

const html =
  '<meta charset="utf-8"><style>' +
  'body{font:12px sans-serif;background:#fff;margin:0;padding:12px}' +
  '.g{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}' +
  'figure{margin:0}img{width:100%;height:165px;object-fit:cover;border:1px solid #bbb;background:#eee}' +
  'figcaption{font-size:11px;padding:4px 0;word-break:break-all;font-weight:600}' +
  '</style><div class="g">' + cards + '</div>';

fs.writeFileSync(path.join(OUT, 'katalog.html'), html);
console.log('obrazkow: ' + picked.length);
picked.forEach((f, i) => console.log(i + 1 + '. ' + path.relative(DOCS, f)));
