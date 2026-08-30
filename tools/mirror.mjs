import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const OUT = path.resolve(process.argv[2] || 'docs');
const START = 'https://supervodarba.sk/';
const PAGE_HOSTS = new Set(['supervodarba.sk', 'www.supervodarba.sk']);
const CDN_HOSTS = new Set(['cdn.bitrix24.pl', 'cdn.bitrix24.site', 'cdn.bitrix24.eu', 'cdn.bitrix24.com']);
// Google Fonts proxy used by Bitrix + the font files it points at.
const FONT_HOSTS = new Set([
  'fonts.bitrix24.pl',
  'fonts.bitrix24.eu',
  'fonts.bitrix24.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
]);
const CDN_DIR = 'cdn-assets';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const SKIP_PATH = /^\/(pub\/site|preview|bitrix\/admin|auth)\//i;

const pages = new Map();   // url -> localPath
const assets = new Map();  // url -> localPath
const queuePages = [];
const queueAssets = [];
const failed = [];
const done = new Set();

const isPageHost = (u) => PAGE_HOSTS.has(u.hostname);
const isAssetHost = (u) => PAGE_HOSTS.has(u.hostname) || CDN_HOSTS.has(u.hostname) || FONT_HOSTS.has(u.hostname);
const hash8 = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 8);

function looksLikePage(u) {
  if (!isPageHost(u)) return false;
  if (SKIP_PATH.test(u.pathname)) return false;
  // guards against junk hrefs (e.g. a phone number used as a relative link)
  if (/[\s+]/.test(decodeURIComponent(u.pathname))) return false;
  if (u.pathname.endsWith('/')) return true;
  const base = u.pathname.split('/').pop();
  return !base.includes('.');
}

function pageLocalPath(u) {
  let p = decodeURIComponent(u.pathname);
  if (p.endsWith('/')) p += 'index.html';
  else p += '/index.html';
  return p.replace(/^\/+/, '');
}

function assetLocalPath(u) {
  let p = decodeURIComponent(u.pathname).replace(/^\/+/, '');
  if (!p || p.endsWith('/')) p += 'index';
  p = p.split('/').map((s) => s.replace(/[<>:"|?*\\]/g, '_')).join('/');
  // Font-CSS endpoints are all the same path with a different query (…/css2?family=X),
  // and must keep a .css extension so GitHub Pages serves them as text/css.
  if (FONT_HOSTS.has(u.hostname)) {
    const ext = path.posix.extname(p);
    if (!ext) p += '-' + hash8(u.search) + '.css';
    else if (u.search) p = p.slice(0, -ext.length) + '-' + hash8(u.search) + ext;
  }
  return PAGE_HOSTS.has(u.hostname) ? p : CDN_DIR + '/' + u.hostname + '/' + p;
}

function register(u) {
  const key = u.origin + u.pathname + u.search;
  if (looksLikePage(u)) {
    const clean = u.origin + u.pathname;
    if (!pages.has(clean)) {
      pages.set(clean, pageLocalPath(u));
      queuePages.push(clean);
    }
    return pages.get(clean);
  }
  if (!isAssetHost(u)) return null;
  if (!assets.has(key)) {
    assets.set(key, assetLocalPath(u));
    queueAssets.push(key);
  }
  return assets.get(key);
}

function relFrom(fromLocal, toLocal) {
  const fromDir = path.posix.dirname('/' + fromLocal);
  let rel = path.posix.relative(fromDir, '/' + toLocal);
  if (toLocal.endsWith('/index.html')) rel = rel.replace(/index\.html$/, '');
  if (rel === '') rel = './';
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel;
}

// returns rewritten local reference, or null to leave the original untouched
function convert(raw, baseUrl, fromLocal) {
  if (!raw) return null;
  const v = raw.trim();
  if (!v || /^(data:|mailto:|tel:|javascript:|#|blob:)/i.test(v)) return null;
  let u;
  try {
    u = new URL(v, baseUrl);
  } catch {
    return null;
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
  if (!isAssetHost(u)) return null;
  const local = register(u);
  if (!local) return null;
  return relFrom(fromLocal, local) + (u.hash || '');
}

const ATTRS = 'href|src|data-src|data-original|data-lazyload-src|data-background|data-bg|poster|action';

function rewriteHtml(html, baseUrl, fromLocal) {
  const conv = (raw) => convert(raw, baseUrl, fromLocal);

  // The live site has one phone link missing its tel: scheme; repair it so it
  // is not rewritten into a link to a page that does not exist.
  html = html.replace(/href\s*=\s*(["'])(\+[\d\s]{6,})\1/gi,
    (m, q, num) => 'href=' + q + 'tel:' + num.replace(/\s+/g, '') + q);

  html = html.replace(new RegExp('\\b(' + ATTRS + ')\\s*=\\s*(["\'])([^"\']*)\\2', 'gi'), (m, a, q, val) => {
    const r = conv(val);
    return r ? a + '=' + q + r + q : m;
  });

  html = html.replace(/\b(srcset|data-srcset)\s*=\s*(["'])([^"']*)\2/gi, (m, a, q, val) => {
    const out = val
      .split(',')
      .map((part) => {
        const seg = part.trim();
        if (!seg) return null;
        const sp = seg.split(/\s+/);
        const r = conv(sp[0]);
        return r ? [r, ...sp.slice(1)].join(' ') : seg;
      })
      .filter(Boolean);
    return a + '=' + q + out.join(', ') + q;
  });

  html = html.replace(/<meta\b[^>]*\bcontent\s*=\s*(["'])([^"']*)\1[^>]*>/gi, (m, q, val) => {
    if (!/^(https?:)?\/\//.test(val.trim())) return m;
    const r = conv(val);
    return r ? m.replace(val, r) : m;
  });

  html = html.replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi, (m, q, val) => {
    const r = conv(val);
    return r ? 'url(' + q + r + q + ')' : m;
  });

  html = html.replace(/(?:https?:)?\/\/(?:www\.)?(?:supervodarba\.sk|(?:cdn|fonts)\.bitrix24\.(?:pl|site|eu|com))\/[^\s"'<>)\\]*/gi, (m) => {
    const r = conv(m.startsWith('//') ? 'https:' + m : m);
    return r || m;
  });

  return html;
}

function rewriteCss(css, baseUrl, fromLocal) {
  const conv = (raw) => convert(raw, baseUrl, fromLocal);
  css = css.replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/gi, (m, q, val) => {
    const r = conv(val);
    return r ? 'url(' + q + r + q + ')' : m;
  });
  css = css.replace(/@import\s+(["'])([^"']+)\1/gi, (m, q, val) => {
    const r = conv(val);
    return r ? '@import ' + q + r + q : m;
  });
  return css;
}

async function fetchBin(url, tries = 3) {
  let last;
  for (let i = 1; i <= tries; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: '*/*' }, redirect: 'follow' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return {
        buf: Buffer.from(await res.arrayBuffer()),
        type: res.headers.get('content-type') || '',
      };
    } catch (e) {
      last = e;
      if (i === tries) break;
      await new Promise((r) => setTimeout(r, 400 * i));
    }
  }
  throw last;
}

async function save(local, data) {
  const full = path.join(OUT, local);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, data);
}

async function runPool(getJob, worker, n) {
  const workers = Array.from({ length: n }, async () => {
    for (;;) {
      const job = getJob();
      if (job === undefined) return;
      await worker(job);
    }
  });
  await Promise.all(workers);
}

// ---- seed from homepage + sitemap
register(new URL(START));
try {
  const sm = await fetchBin('https://supervodarba.sk/sitemap.xml');
  for (const m of sm.buf.toString('utf8').matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)) {
    try {
      register(new URL(m[1]));
    } catch {}
  }
  console.log('sitemap: ' + pages.size + ' stron w kolejce');
} catch (e) {
  console.log('sitemap niedostepny: ' + e.message);
}

// ---- crawl pages (each page can discover more pages)
let pi = 0;
while (pi < queuePages.length) {
  const batch = queuePages.slice(pi, pi + 6);
  pi += batch.length;
  await Promise.all(
    batch.map(async (url) => {
      if (done.has(url)) return;
      done.add(url);
      const local = pages.get(url);
      try {
        const { buf } = await fetchBin(url);
        await save(local, rewriteHtml(buf.toString('utf8'), url, local));
        console.log('PAGE  ' + local);
      } catch (e) {
        failed.push([url, e.message]);
        console.log('FAIL  ' + url + ' :: ' + e.message);
      }
    })
  );
}

// ---- assets (CSS re-enqueues fonts/images it references)
let ai = 0;
const getAsset = () => (ai < queueAssets.length ? queueAssets[ai++] : undefined);
await runPool(
  getAsset,
  async (key) => {
    if (done.has(key)) return;
    done.add(key);
    const local = assets.get(key);
    try {
      const { buf, type } = await fetchBin(key);
      if (/css/i.test(type) || local.endsWith('.css')) {
        await save(local, rewriteCss(buf.toString('utf8'), key, local));
      } else {
        await save(local, buf);
      }
      console.log('ASSET ' + local + ' (' + buf.length + 'B)');
    } catch (e) {
      failed.push([key, e.message]);
      console.log('FAIL  ' + key + ' :: ' + e.message);
    }
  },
  10
);

await save('.nojekyll', '');

console.log('\n=== GOTOWE ===');
console.log('strony: ' + pages.size);
console.log('assety: ' + assets.size);
console.log('bledy:  ' + failed.length);
for (const [u, m] of failed.slice(0, 60)) console.log('  ! ' + u + ' :: ' + m);
