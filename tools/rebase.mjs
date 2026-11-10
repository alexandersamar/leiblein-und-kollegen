// Nach dem Build: alle Adressen auf einen Unterordner umschreiben (z. B. GitHub Pages: /leiblein-und-kollegen/).
// Der Quellcode bleibt auf das Wurzelverzeichnis ausgelegt; auf der echten Domain wird dieser Schritt nicht gebraucht.
// Aufruf: BASE=/leiblein-und-kollegen node tools/rebase.mjs [dist]
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const base = (process.env.BASE || '').replace(/\/$/, '');
const dir = process.argv[2] || 'dist';
if (!base) { console.log('rebase: BASE leer – nichts zu tun'); process.exit(0); }

// "/pfad" → "/base/pfad", aber nicht "//host" (protokollrelativ) und nicht doppelt
const fix = (u) => (u.startsWith('/') && !u.startsWith('//') && !u.startsWith(base + '/') && u !== base ? base + u : u);

const html = (s) => s
  // einfache Attribute
  .replace(/\b(href|src|action|poster|data-ok|data-no|data-src|content)="(\/[^"]*)"/g, (m, a, u) => `${a}="${fix(u)}"`)
  // srcset: mehrere Einträge
  .replace(/\b(srcset|imagesrcset)="([^"]*)"/g, (m, a, v) => `${a}="${v.split(',').map((p) => p.replace(/^(\s*)(\/\S*)/, (x, sp, u) => sp + fix(u))).join(',')}"`)
  // url(/…) in style-Attributen und <style>
  .replace(/url\((['"]?)(\/[^'")]*)\1\)/g, (m, q, u) => `url(${q}${fix(u)}${q})`);
const css = (s) => s.replace(/url\((['"]?)(\/[^'")]*)\1\)/g, (m, q, u) => `url(${q}${fix(u)}${q})`);
// JS: nur Pfade auf eigene Dateien (keine Daten-URIs o. Ä.)
const js = (s) => s.replace(/(['"`])\/(assets|vendor)\//g, (m, q, d) => `${q}${base}/${d}/`);

let n = 0;
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    const e = extname(f);
    const t = e === '.html' ? html : e === '.css' ? css : (e === '.js' || e === '.mjs') && !p.includes('vendor') ? js : null;
    if (!t) continue;
    const s = readFileSync(p, 'utf8'); const r = t(s);
    if (r !== s) { writeFileSync(p, r); n++; }
  }
};
walk(dir);
console.log(`rebase: ${n} Dateien auf ${base}/ umgeschrieben`);
