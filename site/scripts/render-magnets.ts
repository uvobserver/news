// Renders a 3x3 in headline-magnet print file (975x975 px = 300 dpi incl. 0.125 in bleed) for every story,
// using scripts/magnet/render.html. Only missing files are rendered unless --force is given.
//
//   npm run magnets                      render any missing magnets
//   npm run magnets -- --force           re-render all
//   npm run magnets -- <slug> [<slug>…]  render just these stories
//
// Needs Playwright's Chromium (`npx playwright install chromium` on a new machine).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import { ARCHIVE } from '../src/data/index.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public/magnets');
const RENDERER = pathToFileURL(path.join(ROOT, 'scripts/magnet/render.html')).href;

/** Vertical crop position (0 = top) per story; the photo sits above the headline band in most posts. */
const FOCUS_DEFAULT = 0;
const FOCUS: Record<string, number> = {};

const args = process.argv.slice(2);
const force = args.includes('--force');
const only = new Set(args.filter(a => !a.startsWith('--')));

fs.mkdirSync(OUT, { recursive: true });
const todo = ARCHIVE.filter(s => (only.size ? only.has(s.slug) : true) && (force || only.size || !fs.existsSync(path.join(OUT, `${s.slug}.jpg`))));
console.log(`Rendering ${todo.length} magnet(s)…`);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 975, height: 975 } });
for (const s of todo) {
  const params = new URLSearchParams({
    headline: s.title,
    date: s.date,
    photo: pathToFileURL(path.join(ROOT, 'public', s.photo)).href,
    focus: String(FOCUS[s.slug] ?? FOCUS_DEFAULT),
  });
  await page.goto(`${RENDERER}?${params}`);
  await page.waitForFunction(() => (window as unknown as { magnetReady?: boolean }).magnetReady === true, null, { timeout: 20_000 });
  await page.screenshot({ path: path.join(OUT, `${s.slug}.jpg`), type: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: 975, height: 975 } });
  process.stdout.write('.');
}
await browser.close();
console.log(`\nDone. Files are in public/magnets/.`);
