import { useEffect, useState } from 'react';
import { DEEP_CUTS, shuffled } from '../../data';
import { url } from '../../lib/urls';

/** "Microfiche": 14 random deep-archive headlines scrolling across the top; pauses on hover. */
export function Ticker() {
  // The build renders the first 14; the browser reshuffles on load so each visit differs.
  const [items, setItems] = useState(() => DEEP_CUTS.slice(0, 14));
  useEffect(() => setItems(shuffled(DEEP_CUTS).slice(0, 14)), []);
  // Rendered twice so the -50% keyframe loops seamlessly.
  const loop = [...items, ...items];
  return (
    <div className="ticker noprint">
      <div className="ticker__inner">
        <div className="ticker__label">Microfiche</div>
        <div className="ticker__viewport">
          <div className="ticker__track">
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
