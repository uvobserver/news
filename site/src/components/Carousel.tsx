import { useRef, type ReactNode } from 'react';
import { Kicker } from '../ds';

/** Horizontally scrolling strip with a kicker and ←/→ controls. */
export function Carousel({ title, step = 540, className = 'carousel', headClass = 'carousel__head', children }: {
  title: string; step?: number; className?: string; headClass?: string; children: ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dx: number) => track.current?.scrollBy({ left: dx, behavior: 'smooth' });
  return (
    <section className={className} aria-label={title}>
      <div className={headClass}>
        <Kicker>{title}</Kicker>
        <div className="arrows">
          <button type="button" className="arrow" aria-label={`Scroll ${title} left`} onClick={() => scroll(-step)}>←</button>
          <button type="button" className="arrow" aria-label={`Scroll ${title} right`} onClick={() => scroll(step)}>→</button>
        </div>
      </div>
      <div className="carousel__track" ref={track}>{children}</div>
    </section>
  );
}
