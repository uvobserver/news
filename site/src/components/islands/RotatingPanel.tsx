import { useEffect, useState, type ReactNode } from 'react';

/** Shows one item at a time, auto-advancing every `interval` ms; pauses while hovered or focused. */
export function RotatingPanel<T>({ variant, label, items, interval, render }: {
  variant: 'blotter' | 'forum'; label: ReactNode; items: readonly T[]; interval: number; render: (item: T) => ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const step = (n: number) => setIndex(i => (i + n + items.length) % items.length);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex(i => (i + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [paused, interval, items.length]);
  return (
    <section
      className={`panel panel--${variant}`}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
    >
      <div className="panel__head">
        {label}
        <span className="panel__count">{String(index + 1).padStart(2, '0')} / {items.length}</span>
      </div>
      <div className="panel__body" aria-live="polite">{render(items[index])}</div>
      <div className="panel__foot">
        <div className="dots">
          {items.map((_, i) => (
            <button key={i} type="button" className={`dot${i === index ? ' is-active' : ''}`} aria-label={`Show item ${i + 1}`} onClick={() => setIndex(i)} />
          ))}
        </div>
        <div className="arrows">
          <button type="button" className="arrow" aria-label="Previous" onClick={() => step(-1)}>←</button>
          <button type="button" className="arrow" aria-label="Next" onClick={() => step(1)}>→</button>
        </div>
      </div>
    </section>
  );
}
