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

/**
 * Story ids whose post image is a text-only graphic (no photo), found by measuring how much of the photo
 * area is flat white or UVO red. Their magnets get a "Read More…" button in place of the photo.
 */
const READ_MORE = new Set([
  77, 79, 80, 81, 82, 83, 85, 86, 87, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
  106, 107, 108, 111, 115, 118, 119, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136,
  137, 138, 139, 140, 155, 156, 159, 189, 217, 229, 268,
].map(String));

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
    ...(READ_MORE.has(s.id) ? { readmore: '1' } : {}),
  });
  await page.goto(`${RENDERER}?${params}`);
  await page.waitForFunction(() => (window as unknown as { magnetReady?: boolean }).magnetReady === true, null, { timeout: 20_000 });
  await page.screenshot({ path: path.join(OUT, `${s.slug}.jpg`), type: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: 975, height: 975 } });
  process.stdout.write('.');
}
await browser.close();
console.log(`\nDone. Files are in public/magnets/.`);
