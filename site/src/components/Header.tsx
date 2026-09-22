import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ARCHIVE_TAGS } from '../data';
import { Rule } from '../ds';
import { href, type Route } from '../lib/router';
import { INSTAGRAM_URL, PREVIEW_MODE, SUBSTACK_SUBSCRIBE_ACTION, SUBSTACK_URL } from '../lib/links';

export function Header({ route, activeTag }: { route: Route; activeTag: string }) {
  return (
    <>
      <a className="masthead" href={href.home}>
        <img src="assets/logo-with-subhead.png" alt="The UV Observer — Unreal Coverage of the Upper Valley, Published Occasionally" />
      </a>
      <Rule weight="thick" />
      <nav className="nav noprint" aria-label="Main">
        <div className="nav__chips">
          <a className={chip(route.page === 'home')} href={href.home}>Home</a>
          <a className={chip(route.page === 'shop')} href={href.shop}>Shop</a>
          <a className={chip(route.page === 'about')} href={href.about}>About</a>
          <ArchivesMenu active={route.page === 'archive'} activeTag={activeTag} />
        </div>
        <div className="nav__social">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener">Instagram</a>
          <a href={SUBSTACK_URL} target="_blank" rel="noopener">Substack</a>
        </div>
        <Signup />
      </nav>
    </>
  );
}

const chip = (active: boolean) => `navchip${active ? ' is-active' : ''}`;

function ArchivesMenu({ active, activeTag }: { active: boolean; activeTag: string }) {
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
      <button type="button" className={chip(active || open)} aria-expanded={open} onClick={() => setOpen(o => !o)}>Archives ▾</button>
      {open && (
        <div className="dropdown__menu">
          {ARCHIVE_TAGS.map(t => (
            <a key={t} className={`dropdown__item${active && t === activeTag ? ' is-active' : ''}`} href={href.archive(t)} onClick={() => setOpen(false)}>{t}</a>
          ))}
        </div>
      )}
    </div>
  );
}

/** Email field + Subscribe, submitted to Substack in a new tab. */
function Signup() {
  const [done, setDone] = useState(false);
  if (done) {
    return <div className="nav__signup"><span className="signup__done">{PREVIEW_MODE ? 'Preview only: signup is live on the real site.' : "You're on the list."}</span></div>;
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (PREVIEW_MODE) { e.preventDefault(); setDone(true); return; }
    if (!e.currentTarget.checkValidity()) return;
    // Let the native POST go to the new tab, then swap in the confirmation.
    setTimeout(() => setDone(true), 0);
  };
  return (
    <form className="nav__signup" action={SUBSTACK_SUBSCRIBE_ACTION} method="post" target="_blank" onSubmit={onSubmit}>
      <input className="signup__input" type="email" name="email" required placeholder="Your Email" aria-label="Your email" />
      <button className="signup__btn" type="submit">Subscribe</button>
    </form>
  );
}
