// External destinations. Swap these when the Shopify storefront goes live.
export const INSTAGRAM_URL = 'https://www.instagram.com/uvobserver';
export const SUBSTACK_URL = 'https://uvobserver.substack.com';
/** Substack's no-JS embed endpoint; a form POST with an `email` field subscribes that address. */
export const SUBSTACK_SUBSCRIBE_ACTION = `${SUBSTACK_URL}/api/v1/free?nojs=true`;
/** Where fallback product buttons go if Shopify didn't load at build time. */
export const STORE_URL = '/shop/';
/** Google Form for businesses that want to host a UVO distribution box. */
export const HOST_FORM_URL = 'https://forms.gle/vvmkDmyvrifwjjbV9';

export const TIP_EMAIL = 'editor@uvobserver.com';
