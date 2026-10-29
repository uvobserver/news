import { TAG_SLUGS } from '../data';

// Real paths so every story and section is its own indexable, shareable page:
//   /  ·  /story/<slug>/  ·  /archive/  ·  /archive/<section>/  ·  /shop/  ·  /about/
export const url = {
  home: '/',
  story: (s: { slug: string }) => `/story/${s.slug}/`,
  archive: (tag?: string) => (!tag || tag === 'All' ? '/archive/' : `/archive/${TAG_SLUGS.get(tag)}/`),
  shop: '/shop/',
  product: (handle: string) => `/shop/${handle}/`,
  opinion: (slug: string) => `/opinion/${slug}/`,
  about: '/about/',
  inPrint: '/in-print/',
};

export type NavSection = 'home' | 'shop' | 'about' | 'archive' | 'story' | 'in-print';
