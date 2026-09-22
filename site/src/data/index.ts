// Derived collections for each page, mirroring the prototype's selection rules
// so no headline appears twice on the homepage.
import { ARCHIVE_RAW, IN_DEPTH, CITY_LONGFORM, CITY_BRIEFS, IN_FOCUS, PRODUCTS as PRODUCTS_RAW } from './content';
import type { Story, Product } from './types';

export { IN_DEPTH, CITY_LONGFORM, CITY_BRIEFS, IN_FOCUS, IG_POSTS, BLOTTER, FORUM, OPINION } from './content';

export function formatDate(iso: string): string {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

/** Every story, newest first. Kicker colors alternate by original catalog order. */
export const ARCHIVE: Story[] = ARCHIVE_RAW
  .map((s, i): Story => ({ ...s, kickerColor: i % 2 === 0 ? 'primary' : 'secondary', displayDate: formatDate(s.date) }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const STORY_BY_ID = new Map(ARCHIVE.map(s => [s.id, s]));

export const ARCHIVE_TAGS = ['All', ...Array.from(new Set(ARCHIVE.map(s => s.tag))).sort()];

const HOME_STORIES = ARCHIVE.slice(0, 4);
export const LEAD_STORY = HOME_STORIES[0];
export const RECENT_STORIES = HOME_STORIES.slice(1, 4);

const PRODUCT_PHOTOS: Record<string, string> = {
  p1: '/assets/products/p1.webp',
  p2: '/assets/products/p2.webp',
  p3: '/assets/products/p3.webp',
};
export const PRODUCTS: Product[] = PRODUCTS_RAW.map(p => ({ ...p, photo: PRODUCT_PHOTOS[p.slotId] }));
export const FEATURED_PRODUCTS = PRODUCTS.slice(0, 2);

const SEASON_KEYWORDS: Record<number, string[]> = {
  1: ['snow', 'ice', 'winter', 'new year', 'resolution', 'plow', 'january', 'cold'],
  2: ['valentine', 'snow', 'ice', 'winter', 'february', 'mud', 'sugar'],
  3: ['mud', 'sugar', 'maple', 'town meeting', 'march', 'spring', 'daylight'],
  4: ['mud', 'spring', 'april', 'tax', 'rain', 'easter'],
  5: ['may', 'spring', 'graduation', 'mother', 'memorial', 'planting', 'garden'],
  6: ['june', 'summer', 'graduation', 'father', 'solstice', 'swim', 'tourist'],
  7: ['july', 'fourth', 'summer', 'heat', 'a/c', 'fair', 'parade', 'swim', 'tourist'],
  8: ['august', 'summer', 'heat', 'fair', 'back to school', 'corn'],
  9: ['september', 'fall', 'leaf', 'school', 'dartmouth', 'apple', 'harvest'],
  10: ['october', 'fall', 'leaf', 'foliage', 'halloween', 'pumpkin', 'apple', 'cider'],
  11: ['november', 'thanksgiving', 'turkey', 'election', 'vote', 'snow', 'deer'],
  12: ['december', 'christmas', 'holiday', 'snow', 'ski', 'gift', 'new year'],
};

/**
 * Recycled Content: a story from this calendar month in a past year, preferring
 * headlines that match the month's seasonal keywords; otherwise any archive story.
 * Seeded by date so it changes once a day, not on every render.
 */
export const RECYCLED: Story = (() => {
  const now = new Date();
  const m = now.getMonth() + 1;
  const homeTitles = new Set(ARCHIVE.slice(0, 10).map(s => s.title));
  const pool = ARCHIVE.filter(s => !homeTitles.has(s.title));
  const sameMonth = pool.filter(s => Number(s.date.slice(5, 7)) === m);
  const base = sameMonth.length ? sameMonth : pool;
  const kw = SEASON_KEYWORDS[m] ?? [];
  const hits = base.filter(s => kw.some(k => s.title.toLowerCase().includes(k)));
  const cands = hits.length ? hits : base;
  const seed = Number(`${now.getFullYear()}${String(m).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`);
  return cands[seed % cands.length];
})();

const IN_DEPTH_TITLES = new Set(IN_DEPTH.map(d => d.title));
const HOME_TITLES = new Set(HOME_STORIES.map(s => s.title));

export const MOST_READ = ARCHIVE
  .filter(s => !IN_DEPTH_TITLES.has(s.title) && !HOME_TITLES.has(s.title))
  .slice(0, 3);

const USED_TITLES = new Set([
  ...HOME_TITLES,
  ...IN_DEPTH_TITLES,
  ...MOST_READ.map(s => s.title),
  ...CITY_LONGFORM.map(d => d.title),
  ...CITY_BRIEFS.map(b => b.title),
  ...IN_FOCUS.related.map(s => s.title),
]);

export const TOPIC_COLUMNS = (['Food & Dining', 'West Leb', 'Transportation'] as const).map((tag, i) => ({
  tag,
  kickerColor: (i === 1 ? 'secondary' : 'primary') as Story['kickerColor'],
  items: ARCHIVE.filter(s => s.tag === tag && !USED_TITLES.has(s.title)).slice(0, 3),
}));

const ON_HOME = new Set([...USED_TITLES, ...TOPIC_COLUMNS.flatMap(c => c.items.map(s => s.title))]);

/** Stories not shown anywhere on the homepage; the Microfiche ticker draws from these. */
export const DEEP_CUTS = ARCHIVE.filter(s => !ON_HOME.has(s.title));

export function shuffled<T>(list: readonly T[]): T[] {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
