import { useEffect, useState } from 'react';

// Hash routes keep every story shareable on any static host, no server rewrites:
//   #/                 home
//   #/story/:id        story page
//   #/archive[/:tag]   archive, optionally filtered by section
//   #/shop, #/about
export type Route =
  | { page: 'home' }
  | { page: 'story'; id: string }
  | { page: 'archive'; tag: string | null }
  | { page: 'shop' }
  | { page: 'about' };

export function parseHash(hash: string): Route {
  const story = /^#\/story\/(.+)$/.exec(hash);
  if (story) return { page: 'story', id: decodeURIComponent(story[1]) };
  const archive = /^#\/archive(?:\/([^?]*))?/.exec(hash);
  if (archive) return { page: 'archive', tag: archive[1] ? decodeURIComponent(archive[1]) : null };
  if (hash === '#/shop') return { page: 'shop' };
  if (hash === '#/about') return { page: 'about' };
  return { page: 'home' };
}

export const href = {
  home: '#/',
  story: (id: string) => `#/story/${encodeURIComponent(id)}`,
  archive: (tag?: string) => (tag ? `#/archive/${encodeURIComponent(tag)}` : '#/archive'),
  shop: '#/shop',
  about: '#/about',
};

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => {
      const next = parseHash(window.location.hash);
      setRoute(next);
      // Archive filter changes keep the scroll position; everything else starts at the top.
      if (next.page !== 'archive') window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}
