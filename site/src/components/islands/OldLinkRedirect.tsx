import { useEffect } from 'react';

/**
 * Forwards links from the first preview (/#/story/274, /#/archive/Cannabis, …) to real paths.
 * `map` holds only the id→path and tag→path pairs, so the full archive isn't shipped for this.
 */
export function OldLinkRedirect({ stories, tags }: { stories: Record<string, string>; tags: Record<string, string> }) {
  useEffect(() => {
    const h = window.location.hash;
    const story = /^#\/story\/(.+)$/.exec(h);
    const archive = /^#\/archive(?:\/(.*))?$/.exec(h);
    const to = story ? stories[decodeURIComponent(story[1])]
      : archive ? (archive[1] ? tags[decodeURIComponent(archive[1])] : '/archive/')
      : h === '#/shop' ? '/shop/' : h === '#/about' ? '/about/' : undefined;
    if (to) window.location.replace(to);
  }, [stories, tags]);
  return null;
}
