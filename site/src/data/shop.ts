// Shop products, loaded from Shopify at build time. If Shopify can't be reached (or has no products
// published to the Headless channel), the site falls back to the static list from the prototype, whose
// buttons link to the old store. Either way the build succeeds; the Cloudflare log says which it used.
import { PRODUCTS as STATIC_PRODUCTS } from './content';
import { formatMoney, storefront, type Money } from '../lib/shopify';

export type ShopVariant = { id: string; title: string; price: string; available: boolean };

export type ShopProduct = {
  handle: string;
  title: string;
  description: string;
  photo?: string;
  price: string;
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
  handle: p.slotId, title: p.title, description: p.desc, photo: STATIC_PHOTOS[p.slotId], price: p.price, available: true, variants: [],
}));

type ProductNode = {
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage: { url: string } | null;
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
  variants: { nodes: { id: string; title: string; availableForSale: boolean; price: Money }[] };
};

const PRODUCT_FIELDS = `
  handle title description availableForSale
  featuredImage { url(transform: { maxWidth: 800, maxHeight: 800, crop: CENTER }) }
  priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
  variants(first: 50) { nodes { id title availableForSale price { amount currencyCode } } }
`;

const QUERY = `{
  products(first: 50, sortKey: BEST_SELLING) { nodes { ${PRODUCT_FIELDS} } }
  featured: collection(handle: "featured") { products(first: 2) { nodes { handle } } }
}`;

function toProduct(n: ProductNode): ShopProduct {
  const { minVariantPrice: min, maxVariantPrice: max } = n.priceRange;
  const price = min.amount === max.amount ? formatMoney(min) : `From ${formatMoney(min)}`;
  return {
    handle: n.handle,
    title: n.title,
    description: n.description,
    photo: n.featuredImage?.url,
    price,
    available: n.availableForSale,
    variants: n.variants.nodes.map(v => ({
      id: v.id,
      title: v.title === 'Default Title' ? '' : v.title,
      price: formatMoney(v.price),
      available: v.availableForSale,
    })),
  };
}

let loaded: Promise<{ products: ShopProduct[]; featured: ShopProduct[]; live: boolean }> | undefined;

/** Loads once per build and is shared by every page. */
export function loadShop() {
  loaded ??= (async () => {
    try {
      const data = await storefront<{ products: { nodes: ProductNode[] }; featured: { products: { nodes: { handle: string }[] } } | null }>(QUERY);
      const products = data.products.nodes.map(toProduct);
      if (!products.length) throw new Error('no products are published to the Headless sales channel');
      const featuredHandles = data.featured?.products.nodes.map(p => p.handle) ?? [];
      const featured = featuredHandles.length
        ? featuredHandles.map(h => products.find(p => p.handle === h)).filter((p): p is ShopProduct => !!p)
        : products.slice(0, 2);
      console.log(`[shop] Loaded ${products.length} products from Shopify.`);
      return { products, featured, live: true };
    } catch (err) {
      console.warn(`[shop] Using the built-in product list; Shopify didn't load (${(err as Error).message}).`);
      return { products: FALLBACK, featured: FALLBACK.slice(0, 2), live: false };
    }
  })();
  return loaded;
}
