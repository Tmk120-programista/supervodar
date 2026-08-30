// Verifies every local reference in the mirrored site resolves to a real file.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.argv[2] || 'site');
const missing = new Map();
let checked = 0;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = walk(ROOT);
const targets = files.filter((f) => /\.(html|css)$/i.test(f));

for (const file of targets) {
  const text = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  const refs = new Set();

  const push = (v) => {
    if (!v) return;
    const s = v.trim();
    if (!s || /^(data:|mailto:|tel:|javascript:|#|https?:|\/\/)/i.test(s)) return;
    refs.add(s.split('#')[0].split('?')[0]);
  };

  for (const m of text.matchAll(/\b(?:href|src|poster|data-src|data-original|data-lazyload-src)\s*=\s*(["'])([^"']*)\1/gi)) push(m[2]);
  for (const m of text.matchAll(/\b(?:srcset|data-srcset)\s*=\s*(["'])([^"']*)\1/gi))
    for (const part of m[2].split(',')) push(part.trim().split(/\s+/)[0]);
  for (const m of text.matchAll(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi)) push(m[2]);

  for (const ref of refs) {
    if (!ref) continue;
    checked++;
    let target = path.resolve(dir, decodeURIComponent(ref));
    if (ref.endsWith('/') || !path.extname(target)) {
      if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    }
    if (!fs.existsSync(target)) {
      const key = ref;
      if (!missing.has(key)) missing.set(key, []);
      missing.get(key).push(path.relative(ROOT, file));
    }
  }
}

console.log('plikow w kopii:      ' + files.length);
console.log('sprawdzonych odwolan: ' + checked);
console.log('brakujacych celow:    ' + missing.size);
for (const [ref, where] of [...missing].slice(0, 40)) {
  console.log('  ! ' + ref + '   <- ' + where.slice(0, 2).join(', ') + (where.length > 2 ? ' (+' + (where.length - 2) + ')' : ''));
}
