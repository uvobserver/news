import { useMemo, useState } from 'react';
import { ARCHIVE } from '../../data';
import { Headline, Kicker } from '../../ds';
import { url } from '../../lib/urls';

const SORTS = [
  { key: 'new', label: 'Newest' },
  { key: 'old', label: 'Oldest' },
  { key: 'az', label: 'A–Z' },
] as const;
type SortKey = (typeof SORTS)[number]['key'];

/** Search + sort over one section's stories. The build renders the full newest-first list, so it works without JS. */
export function ArchiveResults({ tag }: { tag: string }) {
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
    <div style={{ minWidth: 0 }}>
      <div className="toolbar">
        <input className="search" id="archive-search" type="search" placeholder="Search headlines" aria-label="Search headlines" value={query} onChange={e => setQuery(e.target.value)} />
        <div className="sort" role="group" aria-label="Sort">
          {SORTS.map(o => (
            <button key={o.key} type="button" className={`sortbtn${o.key === sort ? ' is-active' : ''}`} aria-pressed={o.key === sort} onClick={() => setSort(o.key)}>{o.label}</button>
          ))}
        </div>
      </div>
      <div className="results__head">
        <Headline level="md" as="h2">{tag}</Headline>
        <span className="results__count">{stories.length} {stories.length === 1 ? 'story' : 'stories'}</span>
      </div>

      {/* Headline is printed on each image, so cards show only section and date. */}
      <div className="results">
        {stories.map(s => (
          <a key={s.id} className="plainlink storylink" href={url.story(s)}>
            <img className="archiveCard__img" src={s.photo} alt={s.title} loading="lazy" decoding="async" width={600} height={Math.round(600 / s.ar)} />
            <div className="archiveCard__meta">
              <Kicker color={s.kickerColor}>{s.tag}</Kicker>
              <div className="meta meta--sm">{s.displayDate}</div>
            </div>
          </a>
        ))}
      </div>
      {stories.length === 0 && <div className="noresults">No stories match that search.</div>}
    </div>
  );
}
