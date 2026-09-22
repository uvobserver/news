// Turns dist-artifact/index.html into a claude.ai artifact page: the host supplies
// <html>/<head>/<body>, so keep only the title, stylesheets and entry script.
// Also drops public files the site never references (artifacts cap the file count).
import fs from 'node:fs';
import path from 'node:path';
const dir = new URL('../dist-artifact/', import.meta.url).pathname;
const html = fs.readFileSync(dir + 'index.html', 'utf8');
const keep = [
  html.match(/<title>.*?<\/title>/s)[0],
  ...html.match(/<link rel="(?:preconnect|stylesheet)"[^>]*>/g),
  '<div id="root"></div>',
  ...html.match(/<script type="module"[^>]*><\/script>/g),
];
fs.writeFileSync(dir + 'index.html', keep.join('\n') + '\n');

const js = fs.readdirSync(dir + 'assets').filter(f => f.endsWith('.js')).map(f => fs.readFileSync(dir + 'assets/' + f, 'utf8')).join('');
const referenced = new Set([...js.matchAll(/assets\/[\w/.-]+\.(?:jpg|png|webp)/g)].map(m => m[0]));
const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
let removed = 0;
for (const f of walk(dir)) {
  const rel = path.relative(dir, f);
  const isImage = /\.(jpg|png|webp)$/.test(rel);
  if ((isImage && !referenced.has(rel)) || rel.startsWith('fonts/') || rel === 'favicon.svg') { fs.rmSync(f); removed++; }
}
const files = walk(dir);
console.log(`artifact page ready: ${files.length} files (${removed} unused removed)`);
