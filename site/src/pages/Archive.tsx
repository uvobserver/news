import { useMemo, useState } from 'react';
import { ARCHIVE, ARCHIVE_TAGS } from '../data';
import { Headline, Kicker } from '../ds';
import { href } from '../lib/router';

const SORTS = [
  { key: 'new', label: 'Newest' },
  { key: 'old', label: 'Oldest' },
  { key: 'az', label: 'A–Z' },
] as const;
type SortKey = (typeof SORTS)[number]['key'];

const TAG_COUNTS = new Map(ARCHIVE_TAGS.map(t => [t, t === 'All' ? ARCHIVE.length : ARCHIVE.filter(s => s.tag === t).length]));

export function Archive({ tag }: { tag: string }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('new');
  const stories = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = ARCHIVE.filter(s => (tag === 'All' || s.tag === tag) && (!q || s.title.toLowerCase().includes(q)));
    if (sort === 'az') return list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'old') return list.reverse();
    return list;
  }, [tag, query, sort]);

  return (
    <div className="archive">
      <div className="archive__head">
        <div className="archive__title">
          <Kicker>The Microfiche</Kicker>
          <Headline level="xl" as="h1">Archive</Headline>
        </div>
        <div className="archive__intro">Every story the Observer has published, sorted</div>
      </div>

      <div className="archive__grid">
        <nav className="rail" aria-label="Sections">
          <div className="rail__label">Sections</div>
          {ARCHIVE_TAGS.map(t => (
            <a key={t} className={`rail__item${t === tag ? ' is-active' : ''}`} href={href.archive(t)} aria-current={t === tag || undefined}>
              <span>{t}</span>
              <span className="rail__count">{TAG_COUNTS.get(t)}</span>
            </a>
          ))}
        </nav>

        <div style={{ minWidth: 0 }}>
          <div className="toolbar">
            <input className="search" type="search" placeholder="Search headlines" aria-label="Search headlines" value={query} onChange={e => setQuery(e.target.value)} />
            <div className="sort" role="group" aria-label="Sort">
              {SORTS.map(o => (
                <button key={o.key} type="button" className={`sortbtn${o.key === sort ? ' is-active' : ''}`} aria-pressed={o.key === sort} onClick={() => setSort(o.key)}>{o.label}</button>
              ))}
            </div>
          </div>
          <div className="results__head">
            <Headline level="md">{tag}</Headline>
            <span className="results__count">{stories.length} {stories.length === 1 ? 'story' : 'stories'}</span>
          </div>

          {/* Headline is printed on each image, so cards show only section and date. */}
          <div className="results">
            {stories.map(s => (
              <a key={s.id} className="plainlink storylink" href={href.story(s.id)}>
                <img className="archiveCard__img" src={s.photo} alt={s.title} loading="lazy" width={600} height={Math.round(600 / s.ar)} />
                <div className="archiveCard__meta">
                  <Kicker color={s.kickerColor}>{s.tag}</Kicker>
                  <div className="meta meta--sm">{s.displayDate}</div>
                </div>
              </a>
            ))}
          </div>
          {stories.length === 0 && <div className="noresults">No stories match that search.</div>}
        </div>
      </div>
    </div>
  );
}
