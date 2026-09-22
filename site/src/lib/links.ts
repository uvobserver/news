// External destinations. Swap these when the Shopify storefront goes live.
export const INSTAGRAM_URL = 'https://www.instagram.com/uvobserver';
export const SUBSTACK_URL = 'https://uvobserver.substack.com';
/** Substack's no-JS embed endpoint; a form POST with an `email` field subscribes that address. */
export const SUBSTACK_SUBSCRIBE_ACTION = `${SUBSTACK_URL}/api/v1/free?nojs=true`;
/** Current Printful-backed store. "Add to Cart" sends shoppers here until the Shopify cart is built. */
export const STORE_URL = 'https://www.uvobserver.com/store';
export const TIP_EMAIL = 'editor@uvobserver.com';
