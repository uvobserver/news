# The UV Observer — website

Built from the Claude Design handoff in `../project/UV Observer Website.dc.html`.
[Astro](https://astro.build) static site; interactive pieces (ticker, menus, carousels, Police Blotter / Forum,
archive search) are small React islands. Every other part of the page is plain HTML.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type-checks, then writes the static site to dist/
```

## Deploying
Any static host works (Netlify, Vercel, Cloudflare Pages). Connect the GitHub repo and use:
- **Base directory:** `site`
- **Build command:** `npm run build`
- **Publish directory:** `site/dist` (or `dist` relative to the base)
- **Node:** 22 (`.nvmrc`)

`site` in `astro.config.mjs` is set to `https://www.uvobserver.com` for canonical URLs, social previews and the sitemap.

## URLs
| Page | Path |
| --- | --- |
| Home | `/` |
| Story | `/story/<headline-slug>/` |
| Archive | `/archive/` and `/archive/<section>/` (e.g. `/archive/food-and-dining/`) |
| Shop / Contact | `/shop/`, `/about/` |

Story slugs are made from the headline and assigned oldest-first, so a repeated headline gets `-2`, `-3`
and publishing a new story never changes an existing URL. Links from the first preview (`/#/story/274`) are
forwarded to the new paths. Every page has a title, description, canonical URL and Open Graph image;
`sitemap-index.xml` is generated on build.

## Content
- `src/data/content.ts` is generated verbatim from the prototype: `npm run extract-data`.
- `src/data/index.ts` holds the homepage selection rules (no duplicate headlines, the Microfiche draws only
  stories not on the homepage, Recycled Content picks a seasonal story; it updates when the site rebuilds).
- Images live in `public/assets/`.

## Shop (Shopify)
- Products load from Shopify's Storefront API at build time (`src/data/shop.ts`); the cart runs in the
  browser against the same API (`src/lib/cart.ts`) and hands off to Shopify checkout. Store domain and the
  public Storefront token are in `src/lib/shopify.ts`.
- Products must be published to the **Headless** sales channel. A Shopify collection with the handle
  `featured` picks the two items in the Support UV Observer boxes; otherwise the two best sellers show.
- If Shopify can't be reached at build time, the site falls back to the prototype's product list with links
  to the old store. The build log says which it used (`[shop] Loaded N products from Shopify.`).
- Product changes appear on the next build. To rebuild on every change, add a Cloudflare Pages deploy hook and
  point a Shopify product-update webhook at it.

## Not wired yet
- **Newsletter:** the email form posts to Substack's embed endpoint in a new tab (`SUBSTACK_SUBSCRIBE_ACTION`);
  verify against the live publication.
- **Instagram:** the three posts are static; there is no live feed.
