// Real device-metrics screenshots via the Chrome DevTools Protocol.
// Chrome's --screenshot flag clamps the window width, which fakes an overflow;
// Emulation.setDeviceMetricsOverride does not.
// usage: node tools/shot.mjs <url> <out.png> <width> <height> [full]
import { spawn } from 'node:child_process';
import fs from 'node:fs';

const [url, out, w = '390', h = '844', full] = process.argv.slice(2);
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9500 + Math.floor(Math.random() * 400);

const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-sandbox',
  '--remote-debugging-port=' + PORT,
  '--user-data-dir=' + process.env.TEMP + '\\cdp-' + PORT,
  'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function endpoint() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch('http://127.0.0.1:' + PORT + '/json/version');
      return (await r.json()).webSocketDebuggerUrl;
    } catch { await sleep(250); }
  }
  throw new Error('Chrome nie wystartowal');
}

const ws = new WebSocket(await endpoint());
let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
};
await new Promise((r) => (ws.onopen = r));
const send = (method, params = {}) =>
  new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
const call = (method, params = {}) =>
  new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });

await call('Page.enable');
await call('Emulation.setDeviceMetricsOverride', {
  width: +w, height: +h, deviceScaleFactor: 2, mobile: +w < 700,
});
await call('Page.navigate', { url });
await sleep(5000);

// Report the real overflow so a screenshot artefact is never mistaken for a bug.
const probe = await call('Runtime.evaluate', {
  returnByValue: true,
  expression: `(()=>{const d=document.documentElement;
    const wide=[...document.querySelectorAll('*')].filter(e=>e.getBoundingClientRect().right > d.clientWidth + 1)
      .slice(0,6).map(e=>e.tagName+'.'+(e.className||'').toString().slice(0,28)+' -> '+Math.round(e.getBoundingClientRect().right));
    return {viewport:d.clientWidth, scrollWidth:d.scrollWidth, overflow:d.scrollWidth-d.clientWidth, wide};})()`,
});
console.log(JSON.stringify(probe.result.value, null, 1));

const shot = await call('Page.captureScreenshot', {
  format: 'png',
  captureBeyondViewport: !!full,
  ...(full ? { clip: { x: 0, y: 0, width: +w, height: +h, scale: 1 } } : {}),
});
fs.writeFileSync(out, Buffer.from(shot.data, 'base64'));
console.log('zapisano: ' + out);

ws.close();
chrome.kill();
process.exit(0);
