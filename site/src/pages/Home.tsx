import type { ReactNode } from 'react';
import {
  LEAD_STORY, RECENT_STORIES, RECYCLED, FEATURED_PRODUCTS, MOST_READ, TOPIC_COLUMNS,
  IN_DEPTH, CITY_LONGFORM, CITY_BRIEFS, IN_FOCUS, IG_POSTS, BLOTTER, FORUM, OPINION,
} from '../data';
import type { Feature, Story } from '../data/types';
import { Headline, Kicker } from '../ds';
import { Carousel } from '../components/Carousel';
import { Photo } from '../components/Photo';
import { RotatingPanel } from '../components/RotatingPanel';
import { href } from '../lib/router';

export function Home() {
  return (
    <div className="home">
      {/* Above the fold: lead story | Recycled Content + Support */}
      <a className="plainlink lead" href={href.story(LEAD_STORY.id)}>
        <Photo className="lead__photo" src={LEAD_STORY.photo} />
        <div className="lead__body">
          <StoryText story={LEAD_STORY} level="xl" />
        </div>
      </a>

      <div>
        <a className="plainlink recycled" href={href.story(RECYCLED.id)}>
          <div className="recycled__label"><span className="recycled__icon" aria-hidden="true">♻</span><span>Recycled Content</span></div>
          <div className="recycled__title">{RECYCLED.title}</div>
          <div className="meta">{RECYCLED.displayDate}</div>
        </a>
        <div>
          <div className="modhead">
            <Kicker color="secondary">Support UV Observer</Kicker>
            <a className="moreLink" href={href.shop}>Visit Shop →</a>
          </div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FEATURED_PRODUCTS.map(p => (
              <a key={p.slotId} className="plainlink productRow" href={href.shop}>
                <Photo className="productRow__photo" src={p.photo} />
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div className="productTitle">{p.title}</div>
                  <div className="productPrice">{p.price}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="fullrow divider"><div /></div>

      <div className="recent">
        {RECENT_STORIES.map(s => (
          <a key={s.id} className="plainlink recent__item" href={href.story(s.id)}>
            <Photo src={s.photo} width="220px" ar={s.ar} />
            <StoryText story={s} level="lg" />
          </a>
        ))}
      </div>

      <div className="sidecol">
        <Kicker>Most Read</Kicker>
        <div className="thumbList">
          {MOST_READ.map(s => (
            <a key={s.id} className="plainlink thumbRow" href={href.story(s.id)}>
              <Photo src={s.photo} width="110px" ar={s.ar} />
              <Headline level="md">{s.title}</Headline>
            </a>
          ))}
        </div>
        <div style={{ marginTop: 32 }}>
          <Kicker>Follow @uvobserver</Kicker>
          <div className="igGrid">
            {IG_POSTS.slice(0, 3).map(p => (
              <a key={p.link} href={p.link} target="_blank" rel="noopener" aria-label="Instagram post" style={{ backgroundImage: `url("${p.image}")` }} />
            ))}
          </div>
        </div>
      </div>

      <Carousel title="In-Depth">
        {IN_DEPTH.map(d => <FeatureCard key={d.title} item={d} />)}
      </Carousel>

      <div className="sidestack">
        <RotatingPanel
          variant="blotter" label={<Kicker color="secondary">Police Blotter</Kicker>} items={BLOTTER} interval={7000}
          render={b => (
            <>
              <div className="blotter__town">{b.town}</div>
              <div className="blotter__text">{b.text}</div>
            </>
          )}
        />
        <RotatingPanel
          variant="forum" label={<span className="panel__label">Forum</span>} items={FORUM} interval={9000}
          render={f => (
            <>
              <div className="forum__title">{f.title}</div>
              <div className="forum__text">{f.text}</div>
              <div className="forum__sig">{f.sig}</div>
            </>
          )}
        />
      </div>

      <section className="infocus" aria-label={`In Focus: ${IN_FOCUS.topic}`}>
        <div className="shell">
          <div className="infocus__label">In Focus: {IN_FOCUS.topic}</div>
          <div className="infocus__grid">
            <div className="infocus__lead">
              <Photo className="infocus__photo" src={IN_FOCUS.photo} />
              <div className="infocus__text">
                <h2 className="infocus__headline">{IN_FOCUS.headline}</h2>
                <div className="infocus__dek">{IN_FOCUS.dek}</div>
                <div className="infocus__date">{IN_FOCUS.date}</div>
              </div>
            </div>
            <div className="infocus__related">
              <div className="infocus__relatedLabel">Related Coverage</div>
              <div className="infocus__list">
                {IN_FOCUS.related.map(r => (
                  <div key={r.title} className="infocus__item">
                    <Photo src={r.photo} width="96px" ar={r.ar} />
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div className="infocus__itemTitle">{r.title}</div>
                      <div className="infocus__itemDate">{r.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Carousel title="City News">
        {CITY_LONGFORM.map(d => <FeatureCard key={d.title} item={d} />)}
        {CITY_BRIEFS.map(b => (
          <MaybeLink key={b.title} className="brief" link={b.link}>
            <div className="brief__label">News In Brief</div>
            <Headline level="sm">{b.title}</Headline>
            <div className="meta meta--sm">{b.date}</div>
          </MaybeLink>
        ))}
      </Carousel>

      <section className="opinion" aria-label="Opinion">
        <Kicker>Opinion</Kicker>
        {OPINION.map(o => (
          <div key={o.title} className="opinion__item">
            <div className="opinion__kicker">{o.kicker}</div>
            <Headline level="sm">{o.title}</Headline>
            <div className="opinion__byline">{o.byline}</div>
            <div className="opinion__dek">{o.dek}</div>
          </div>
        ))}
      </section>

      <div className="topics">
        {TOPIC_COLUMNS.map(c => (
          <section key={c.tag} aria-label={c.tag}>
            <Kicker color={c.kickerColor}>{c.tag}</Kicker>
            <div className="thumbList">
              {c.items.map(s => (
                <a key={s.id} className="plainlink thumbRow" href={href.story(s.id)}>
                  <Photo src={s.photo} width="92px" ar={s.ar} />
                  <div className="thumbRow__text">
                    <Headline level="sm">{s.title}</Headline>
                    <div className="meta meta--sm">{s.displayDate}</div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function StoryText({ story, level }: { story: Story; level: 'xl' | 'lg' }) {
  return (
    <div className="storytext">
      <Kicker color={story.kickerColor}>{story.tag}</Kicker>
      <Headline level={level} as={level === 'xl' ? 'h1' : 'h2'}>{story.title}</Headline>
      {story.dek && <div className="dek">{story.dek}</div>}
      <div className="meta">{story.displayDate}</div>
    </div>
  );
}

function FeatureCard({ item }: { item: Feature }) {
  return (
    <MaybeLink className="card" link={item.link}>
      <Photo className="card__photo" src={item.photo} ar={item.ar} />
      <Headline level="sm">{item.title}</Headline>
      <div className="card__dek">{item.dek}</div>
    </MaybeLink>
  );
}

/** Long-form pieces link out to Substack; headline-and-photo items with no source link stay unlinked. */
function MaybeLink({ link, className, children }: { link?: string; className: string; children: ReactNode }) {
  if (!link) return <div className={className}>{children}</div>;
  return <a className={`plainlink ${className}`} href={link} target="_blank" rel="noopener">{children}</a>;
}
