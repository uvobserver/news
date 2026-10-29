// Shopify Storefront API client, used at build time (product listings) and in the browser (cart).
// The public Storefront token is designed to ship in page source: it can read published products
// and manage carts, nothing else. Never put an Admin API token (shpat_…) here.
export const SHOPIFY_DOMAIN = 'uvobserver.myshopify.com';
export const STOREFRONT_TOKEN = '45a704c9133eca3ce3bdbc688543dd1c';
export const API_VERSION = '2026-07';

const ENDPOINT = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`;

export async function storefront<T>(query: string, variables: Record<string, unknown> = {}, timeoutMs = 15_000): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new Error(`Shopify HTTP ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors.map(e => e.message).join('; '));
  if (!json.data) throw new Error('Shopify returned no data');
  return json.data;
}

export type Money = { amount: string; currencyCode: string };

export function formatMoney(m: Money): string {
  const n = Number(m.amount);
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: m.currencyCode }).format(n);
}
