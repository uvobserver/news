// One-off: pull the raw content literals out of the Claude Design prototype
// so the site's data files match it exactly. Re-run if the prototype changes.
import fs from 'node:fs';
const src = fs.readFileSync(new URL('../../project/UV Observer Website.dc.html', import.meta.url), 'utf8');
const script = src.slice(src.indexOf('<script type="text/x-dc" data-dc-script>'));
function literal(name, endMarker) {
  const start = script.indexOf(`const ${name} = `);
  if (start < 0) throw new Error('missing ' + name);
  const from = start + `const ${name} = `.length;
  const end = script.indexOf(endMarker, from);
  return script.slice(from, end + endMarker.length).trim().replace(/;$/, "");
}
const lit = {
  ARCHIVE: literal('ARCHIVE', '\n]'),
  IN_DEPTH: literal('IN_DEPTH', '\n]'),
  CITY_LONGFORM: literal('CITY_LONGFORM', '\n]'),
  CITY_BRIEFS: literal('CITY_BRIEFS', '\n]'),
  IN_FOCUS_RELATED: (() => { const s = script.indexOf('related: ['); return script.slice(s + 9, script.indexOf('\n  ]', s) + 4).trim(); })(),
  IG_POSTS: literal('IG_POSTS', '\n]'),
  PRODUCTS: literal('PRODUCTS', '\n]'),
  BLOTTER: literal('BLOTTER', '\n]'),
  FORUM: literal('FORUM', '\n]'),
  OPINION: literal('OPINION', '\n]'),
};
const infocus = /topic: '([^']*)',\s*headline: '([^']*)',\s*dek: '([^']*)',\s*date: '([^']*)'/.exec(script);
const out = `// Generated from project/UV Observer Website.dc.html by scripts/extract-data.mjs.
// Content is verbatim from the Claude Design prototype.
import type { RawStory, Feature, Brief, RelatedItem, IgPost, Product, BlotterItem, ForumLetter, OpinionPiece } from './types';

export const ARCHIVE_RAW: RawStory[] = ${lit.ARCHIVE};

export const IN_DEPTH: Feature[] = ${lit.IN_DEPTH};

export const CITY_LONGFORM: Feature[] = ${lit.CITY_LONGFORM};

export const CITY_BRIEFS: Brief[] = ${lit.CITY_BRIEFS};

export const IN_FOCUS = {
  topic: ${JSON.stringify(infocus[1])},
  headline: ${JSON.stringify(infocus[2])},
  dek: ${JSON.stringify(infocus[3])},
  date: ${JSON.stringify(infocus[4])},
  photo: 'assets/infocus-lead.webp',
  related: ${lit.IN_FOCUS_RELATED} as RelatedItem[],
};

export const IG_POSTS: IgPost[] = ${lit.IG_POSTS};

export const PRODUCTS: Product[] = ${lit.PRODUCTS};

export const BLOTTER: BlotterItem[] = ${lit.BLOTTER};

export const FORUM: ForumLetter[] = ${lit.FORUM};

export const OPINION: OpinionPiece[] = ${lit.OPINION};
`;
fs.writeFileSync(new URL('../src/data/content.ts', import.meta.url), out);
console.log('wrote src/data/content.ts', out.length, 'bytes');
