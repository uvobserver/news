import { useMemo } from 'react';
import { ARCHIVE, FEATURED_PRODUCTS, shuffled } from '../data';
import type { Story as StoryT } from '../data/types';
import { Headline, Kicker } from '../ds';
import { Carousel } from '../components/Carousel';
import { Photo } from '../components/Photo';
import { href } from '../lib/router';
import { STORE_URL } from '../lib/links';

// Random picks are cached per story so they stay put while reading but differ story to story.
const relatedCache = new Map<string, StoryT[]>();
function relatedFor(id: string): StoryT[] {
  let list = relatedCache.get(id);
  if (!list) {
    list = shuffled(ARCHIVE.filter(s => s.id !== id)).slice(0, 10);
    relatedCache.set(id, list);
  }
  return list;
}

export function Story({ story }: { story: StoryT }) {
  const related = useMemo(() => relatedFor(story.id), [story.id]);
  const shareUrl = `${window.location.host}/${href.story(story.id)}`;
  return (
    <div className="storypage">
      <a className="backlink noprint" href={href.home}>← Back to Front Page</a>
      <div className="storygrid">
        <article className="storymain">
          <Kicker color={story.kickerColor}>{story.tag}</Kicker>
          <Headline level="xl" as="h1">{story.title}</Headline>
          <div className="meta">{story.displayDate}</div>
          <img className="storyimg" src={story.photo} alt={story.title} />
          <div className="share noprint">
            <span className="share__label">Share</span>
            <span className="share__url">{shareUrl}</span>
            <button type="button" className="sortbtn outlinebtn" onClick={() => window.print()}>Print This Story</button>
          </div>
        </article>

        <aside className="storyside noprint">
          <Kicker>Support UV Observer</Kicker>
          {FEATURED_PRODUCTS.map(p => (
            <div key={p.slotId} className="storyside__product">
              <Photo className="storyside__photo" src={p.photo} />
              <div className="productTitle">{p.title}</div>
              <div className="productPrice">{p.price}</div>
              <a className="ds-subscribe ds-subscribe--secondary" href={STORE_URL} target="_blank" rel="noopener">Add To Cart</a>
            </div>
          ))}
          <a className="sortbtn" href={href.shop} style={{ padding: '6px 0 0' }}>Visit Shop →</a>
        </aside>

        <Carousel title="Related Articles" step={480} className="related noprint" headClass="related__head">
          {related.map(s => (
            <a key={s.id} className="plainlink storylink" href={href.story(s.id)}>
              <Photo className="card__photo" src={s.photo} ar={s.ar} />
              <Headline level="sm">{s.title}</Headline>
              <div className="meta meta--sm" style={{ letterSpacing: '0.05em' }}>{s.displayDate}</div>
            </a>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export function StoryNotFound() {
  return (
    <div className="simplepage">
      <Headline level="xl" as="h1">Story Not Found</Headline>
      <p className="about__intro">That story isn't in the archive. <a href={href.archive('All')}>Browse the archive</a>.</p>
    </div>
  );
}
