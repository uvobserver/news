# The UV Observer — website

Implementation of the Claude Design handoff in `../project/UV Observer Website.dc.html`
(Vite + React + TypeScript, static output).

```sh
npm install
npm run dev      # local dev server
npm run build    # static site in dist/ — deploy anywhere (hash routes, no rewrites needed)
```

## Routes
`#/` home · `#/story/:id` story (shareable, prints to one letter page) · `#/archive/:tag` archive · `#/shop` · `#/about`

## Content
- `src/data/content.ts` is generated verbatim from the prototype: `npm run extract-data`.
- `src/data/index.ts` holds the homepage selection rules (no duplicate headlines, Microfiche draws only
  stories not on the homepage, Recycled Content rotates daily by season).
- Images live in `public/assets/` (story art from the prototype's `assets/uvo/`, product and In Focus photos
  extracted from its image slots).

## Not wired yet
- **Shop:** "Add to Cart" links to the current store (`STORE_URL` in `src/lib/links.ts`) until the Shopify
  Storefront API cart is built.
- **Newsletter:** the email form posts to Substack's embed endpoint in a new tab (`SUBSTACK_SUBSCRIBE_ACTION`);
  verify against the live publication.
- **Instagram:** the three posts are static; there is no live feed.
- **Placeholders:** the IN FOCUS story is still marked "Placeholder", and products 4–6 have no photos.
