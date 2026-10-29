import { useEffect, useRef, useState } from 'react';
import { ARCHIVE_TAGS } from '../../data';
import { url } from '../../lib/urls';

export function ArchivesMenu({ active, activeTag }: { active: boolean; activeTag?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', close); };
  }, [open]);
  return (
    <div className="dropdown" ref={ref}>
      <button type="button" className={`navchip${active || open ? ' is-active' : ''}`} aria-expanded={open} onClick={() => setOpen(o => !o)}>Archives ▾</button>
      {open && (
        <div className="dropdown__menu">
          {ARCHIVE_TAGS.map(t => (
            <a key={t} className={`dropdown__item${active && t === activeTag ? ' is-active' : ''}`} href={url.archive(t)}>{t}</a>
          ))}
        </div>
      )}
    </div>
  );
}
