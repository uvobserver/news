import { useEffect, useRef, useState } from 'react';
import { DEEP_CUTS, shuffled } from '../../data';
import { url } from '../../lib/urls';

/** Seconds for one full pass through the headlines, matching the original 90s CSS loop. */
const LOOP_SECONDS = 90;

/**
 * "Microfiche": 14 random deep-archive headlines scrolling across the top.
 * Scrolls the viewport with requestAnimationFrame rather than a CSS transform on one very wide
 * strip, which mobile Safari can't composite (it froze and tore on phones). Pauses on hover,
 * and briefly while touched; stops for readers who prefer reduced motion.
 */
export function Ticker() {
  // The build renders the first 14; the browser reshuffles on load so each visit differs.
  const [items, setItems] = useState(() => DEEP_CUTS.slice(0, 14));
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const resume = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => setItems(shuffled(DEEP_CUTS).slice(0, 14)), []);

  useEffect(() => {
    const vp = viewport.current, tr = track.current;
    if (!vp || !tr || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let pos = 0, last = 0, frame = 0;
    vp.scrollLeft = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 100) / 1000 : 0;
      last = now;
      const half = tr.scrollWidth / 2; // the list is rendered twice; wrap after one copy
      if (!paused.current && half > 0) {
        pos = (pos + (half / LOOP_SECONDS) * dt) % half;
        vp.scrollLeft = pos;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [items]);

  const hold = () => { clearTimeout(resume.current); paused.current = true; };
  const release = (delay = 0) => { clearTimeout(resume.current); resume.current = setTimeout(() => { paused.current = false; }, delay); };

  const loop = [...items, ...items];
  return (
    <div className="ticker noprint">
      <div className="ticker__inner">
        <div className="ticker__label">Microfiche</div>
        <div
          className="ticker__viewport" ref={viewport}
          onMouseEnter={hold} onMouseLeave={() => release()}
          onTouchStart={hold} onTouchEnd={() => release(2500)} onTouchCancel={() => release(2500)}
          onFocus={hold} onBlur={() => release()}
        >
          <div className="ticker__track" ref={track}>
            {loop.map((s, i) => (
              <a key={i} className="ticker__item" href={url.story(s)} aria-hidden={i >= items.length || undefined} tabIndex={i >= items.length ? -1 : undefined}>
                <span className="ticker__title">{s.title}</span>
                <span className="ticker__sep" aria-hidden="true">▪</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
