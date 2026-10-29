// Cloudflare Pages redirect rules (dist/_redirects; Astro skips files named with a leading underscore,
// so the name comes from getStaticPaths), generated from the archive so every old Squarespace
// address keeps working after the domain moves. Squarespace post numbers are 20000 + the story id
// (checked against all 193 Squarespace links in the UVO Headline Catalog). First matching rule wins.
import type { APIRoute } from 'astro';
import { ARCHIVE, TAG_SLUGS } from '../data';
import { url } from '../lib/urls';

export const getStaticPaths = () => [{ params: { redirects: '_redirects' } }];

export const GET: APIRoute = () => {
  const lines = [
    '# Old Squarespace story posts',
    ...ARCHIVE.map(s => `/news/${20000 + Number(s.id)} ${url.story(s)} 301`),
    '',
    '# Old Squarespace sections and store',
    ...[...TAG_SLUGS].map(([, slug]) => `/news/category/${slug} /archive/${slug}/ 301`),
    '/news /archive/ 301',
    '/store /shop/ 301',
    '/store/* /shop/ 301',
    '',
    '# Anything else under /news (posts not carried over) goes to the archive; keep this last.',
    '/news/* /archive/ 301',
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain' } });
};
