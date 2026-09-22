// Static (no-JS) building blocks shared by the pages.
import type { ReactNode } from 'react';
import type { Feature, Story } from '../data/types';
import { Headline, Kicker } from '../ds';
import { Photo } from './Photo';

export function StoryText({ story, level }: { story: Story; level: 'xl' | 'lg' }) {
  return (
    <div className="storytext">
      <Kicker color={story.kickerColor}>{story.tag}</Kicker>
      <Headline level={level} as={level === 'xl' ? 'h1' : 'h2'}>{story.title}</Headline>
      {story.dek && <div className="dek">{story.dek}</div>}
      <div className="meta">{story.displayDate}</div>
    </div>
  );
}

export function FeatureCard({ item }: { item: Feature }) {
  return (
    <MaybeLink className="card" link={item.link}>
      <Photo className="card__photo" src={item.photo} ar={item.ar} />
      <Headline level="sm">{item.title}</Headline>
      <div className="card__dek">{item.dek}</div>
    </MaybeLink>
  );
}

/** Long-form pieces link out to Substack; headline-and-photo items with no source link stay unlinked. */
export function MaybeLink({ link, className, children }: { link?: string; className: string; children: ReactNode }) {
  if (!link) return <div className={className}>{children}</div>;
  return <a className={`plainlink ${className}`} href={link} target="_blank" rel="noopener">{children}</a>;
}
