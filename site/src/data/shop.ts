// Shop products, loaded from Shopify at build time. If Shopify can't be reached (or has no products
// published to the Headless channel), the site falls back to the static list from the prototype, whose
// buttons link to the old store. Either way the build succeeds; the Cloudflare log says which it used.
//
// Ordering is controlled in Shopify with two manual collections (matched by URL handle, not title):
//   `shop`     - order of the Shop page; products not in it follow, newest first
//   `featured` - the two products in the Support UV Observer boxes; otherwise the first two on the Shop page
import { PRODUCTS as STATIC_PRODUCTS } from './content';
import { formatMoney, storefront, type Money } from '../lib/shopify';

export type ShopVariant = { id: string; title: string; price: string; available: boolean; image?: string };
export type ShopImage = { src: string; thumb: string; alt: string };

export type ShopProduct = {
  handle: string;
  title: string;
  /** Plain text, for cards and meta descriptions. */
  description: string;
  /** Formatted description from Shopify's editor, for the product page. */
  descriptionHtml: string;
  seoTitle?: string;
  seoDescription?: string;
  photo?: string;
  images: ShopImage[];
  price: string;
  /** Lowest price as a number and ISO currency, for structured data. */
  priceAmount?: string;
  currency?: string;
  available: boolean;
  /** Empty for fallback products, whose buttons link to the old store instead of the cart. */
  variants: ShopVariant[];
};

const STATIC_PHOTOS: Record<string, string> = {
  p1: '/assets/products/p1.webp',
  p2: '/assets/products/p2.webp',
  p3: '/assets/products/p3.webp',
};

const FALLBACK: ShopProduct[] = STATIC_PRODUCTS.map(p => ({
  handle: p.slotId, title: p.title, description: p.desc, descriptionHtml: '', photo: STATIC_PHOTOS[p.slotId],
  images: [], price: p.price, available: true, variants: [],
}));

type Img = { large: string; thumb: string; altText: string | null };
type ProductNode = {
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  seo: { title: string | null; description: string | null };
  images: { nodes: Img[] };
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  variants: { nodes: { id: string; title: string; availableForSale: boolean; price: Money; image: { large: string } | null }[] };
};

// Square crops everywhere (product images are 1:1 across the site).
const LARGE = 'large: url(transform: { maxWidth: 1200, maxHeight: 1200, crop: CENTER })';
const THUMB = 'thumb: url(transform: { maxWidth: 240, maxHeight: 240, crop: CENTER })';

const PRODUCT_FIELDS = `
  handle title description descriptionHtml availableForSale
  seo { title description }
  images(first: 20) { nodes { ${LARGE} ${THUMB} altText } }
  priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
  variants(first: 100) { nodes { id title availableForSale price { amount currencyCode } image { ${LARGE} } } }
`;

const QUERY = `{
  products(first: 100, sortKey: CREATED_AT, reverse: true) { nodes { ${PRODUCT_FIELDS} } }
  shopOrder: collection(handle: "shop") { products(first: 100) { nodes { handle } } }
  featured: collection(handle: "featured") { products(first: 2) { nodes { handle } } }
}`;

type HandleList = { products: { nodes: { handle: string }[] } } | null;

function toProduct(n: ProductNode): ShopProduct {
  const { minVariantPrice: min, maxVariantPrice: max } = n.priceRange;
  const images = n.images.nodes.map(i => ({ src: i.large, thumb: i.thumb, alt: i.altText || n.title }));
  return {
    handle: n.handle,
    title: n.title,
    description: n.description,
    descriptionHtml: n.descriptionHtml,
    seoTitle: n.seo.title || undefined,
    seoDescription: n.seo.description || undefined,
    photo: images[0]?.src,
    images,
    price: min.amount === max.amount ? formatMoney(min) : `From ${formatMoney(min)}`,
    priceAmount: min.amount,
    currency: min.currencyCode,
    available: n.availableForSale,
    variants: n.variants.nodes.map(v => ({
      id: v.id,
      title: v.title === 'Default Title' ? '' : v.title,
      price: formatMoney(v.price),
      available: v.availableForSale,
      image: v.image?.large,
    })),
  };
}

/** Products named in `order` first (in that order), then the rest as given. */
function arrange(products: ShopProduct[], order: string[]): ShopProduct[] {
  const byHandle = new Map(products.map(p => [p.handle, p]));
  const first = order.map(h => byHandle.get(h)).filter((p): p is ShopProduct => !!p);
  const picked = new Set(first.map(p => p.handle));
  return [...first, ...products.filter(p => !picked.has(p.handle))];
}

let loaded: Promise<{ products: ShopProduct[]; featured: ShopProduct[]; live: boolean }> | undefined;

/** Loads once per build and is shared by every page. */
export function loadShop() {
  loaded ??= (async () => {
    try {
      const data = await storefront<{ products: { nodes: ProductNode[] }; shopOrder: HandleList; featured: HandleList }>(QUERY);
      const all = data.products.nodes.map(toProduct);
      if (!all.length) throw new Error('no products are published to the Headless sales channel');
      const products = arrange(all, data.shopOrder?.products.nodes.map(p => p.handle) ?? []);
      const picks = (data.featured?.products.nodes ?? [])
        .map(f => products.find(p => p.handle === f.handle))
        .filter((p): p is ShopProduct => !!p);
      const featured = picks.length ? picks : products.slice(0, 2);
      console.log(`[shop] Loaded ${products.length} products from Shopify${data.shopOrder ? ' (ordered by the "shop" collection)' : ''}.`);
      return { products, featured, live: true };
    } catch (err) {
      console.warn(`[shop] Using the built-in product list; Shopify didn't load (${(err as Error).message}).`);
      return { products: FALLBACK, featured: FALLBACK.slice(0, 2), live: false };
    }
  })();
  return loaded;
}
