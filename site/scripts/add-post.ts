// Adds a post from the "UVO Website" Canva folder to the site: saves the 4:5 post image (full) and its photo
// area above the headline band (crop, same proportions as the Squarespace-era stories), then appends the
// story to src/data/posts.json. Re-running for a design that's already on the site does nothing.
//
//   npm run add-post -- --image post.jpg --canva DAHA3lnOUKw --title "Headline" --tag Health [--date 2026-10-29]
import fs from 'node:fs';
import path from 'node:path';
import { parseArgs } from 'node:util';
import sharp from 'sharp';
import { ARCHIVE, ARCHIVE_TAGS } from '../src/data/index.ts';
import type { RawStory } from '../src/data/types.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
const POSTS = path.join(ROOT, 'src/data/posts.json');
const WIDTH = 1100;
/** Photo area as a share of the 4:5 post's height (1003 of 1375 px), matching the existing crops. */
const CROP_AR = 1100 / 1003;

const { values: a } = parseArgs({
  options: {
    image: { type: 'string' },
    canva: { type: 'string' },
    title: { type: 'string' },
    tag: { type: 'string' },
    date: { type: 'string', default: new Date().toISOString().slice(0, 10) },
  },
});
if (!a.image || !a.canva || !a.title || !a.tag) {
  console.error('Usage: npm run add-post -- --image <file> --canva <design id> --title <headline> --tag <category> [--date YYYY-MM-DD]');
  process.exit(1);
}
if (!/^\d{4}-\d\d-\d\d$/.test(a.date!)) throw new Error(`Bad --date ${a.date}`);
if (!ARCHIVE_TAGS.includes(a.tag)) console.warn(`Note: "${a.tag}" is a new category.`);

const posts: RawStory[] = JSON.parse(fs.readFileSync(POSTS, 'utf8'));
if (ARCHIVE.some(s => s.canva === a.canva)) {
  console.log(`Already on the site: ${a.canva}`);
  process.exit(0);
}

const id = String(Math.max(...ARCHIVE.map(s => Number(s.id))) + 1);
const full = sharp(a.image).resize({ width: WIDTH }).jpeg({ quality: 88, mozjpeg: true });
const { data, info } = await full.toBuffer({ resolveWithObject: true });
fs.writeFileSync(path.join(ROOT, `public/assets/uvo/full/${id}.jpg`), data);
await sharp(data)
  .extract({ left: 0, top: 0, width: info.width, height: Math.min(info.height, Math.round(info.width / CROP_AR)) })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(path.join(ROOT, `public/assets/uvo/crop/${id}.jpg`));

posts.push({
  id, title: a.title, date: a.date!, tag: a.tag,
  photo: `/assets/uvo/crop/${id}.jpg`, ar: Number(CROP_AR.toFixed(3)), canva: a.canva,
});
fs.writeFileSync(POSTS, JSON.stringify(posts, null, 2) + '\n');
console.log(`Added story ${id}: ${a.title}`);
