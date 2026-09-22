import { useEffect, useState } from 'react';
import { ARCHIVE, shuffled } from '../../data';
import { Headline } from '../../ds';
import { Photo } from '../Photo';
import { url } from '../../lib/urls';
import { Carousel } from './Carousel';

/** Ten random stories. The build shows same-section picks; the browser reshuffles on load. */
export function RelatedArticles({ id, tag }: { id: string; tag: string }) {
  const [list, setList] = useState(() => {
    const others = ARCHIVE.filter(s => s.id !== id);
    return [...others.filter(s => s.tag === tag), ...others.filter(s => s.tag !== tag)].slice(0, 10);
  });
  useEffect(() => setList(shuffled(ARCHIVE.filter(s => s.id !== id)).slice(0, 10)), [id]);
  return (
    <Carousel title="Related Articles" step={480} className="related noprint" headClass="related__head">
      {list.map(s => (
        <a key={s.id} className="plainlink storylink" href={url.story(s)}>
          <Photo className="card__photo" src={s.photo} ar={s.ar} />
          <Headline level="sm">{s.title}</Headline>
          <div className="meta meta--sm" style={{ letterSpacing: '0.05em' }}>{s.displayDate}</div>
        </a>
      ))}
    </Carousel>
  );
}
