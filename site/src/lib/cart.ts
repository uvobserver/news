// Browser-side cart backed by the Shopify Storefront Cart API. One store shared by every island
// on the page (they import the same module); the cart id is remembered in localStorage.
import { formatMoney, storefront, type Money } from './shopify';

export type CartLine = { id: string; quantity: number; title: string; variantTitle: string; price: string; image?: string };
export type CartState = {
  id?: string;
  checkoutUrl?: string;
  lines: CartLine[];
  count: number;
  subtotal?: string;
  open: boolean;
  busy: boolean;
  error?: string;
};

const STORAGE_KEY = 'uvo-cart-id';

const CART_FIELDS = `
  id checkoutUrl totalQuantity
  cost { subtotalAmount { amount currencyCode } }
  lines(first: 100) { nodes { id quantity merchandise { ... on ProductVariant {
    title price { amount currencyCode } image { url(transform: { maxWidth: 160 }) }
    product { title }
  } } } }
`;

type CartNode = {
  id: string; checkoutUrl: string; totalQuantity: number;
  cost: { subtotalAmount: Money };
  lines: { nodes: { id: string; quantity: number; merchandise: { title: string; price: Money; image: { url: string } | null; product: { title: string } } }[] };
};
type UserError = { message: string };

let state: CartState = { lines: [], count: 0, open: false, busy: false };
const listeners = new Set<() => void>();

function set(patch: Partial<CartState>) {
  state = { ...state, ...patch };
  listeners.forEach(l => l());
}

export const cartStore = {
  subscribe(l: () => void) { listeners.add(l); return () => listeners.delete(l); },
  get: () => state,
};

function remember(id: string | undefined) {
  try { id ? localStorage.setItem(STORAGE_KEY, id) : localStorage.removeItem(STORAGE_KEY); } catch { /* storage blocked */ }
}

function apply(cart: CartNode | null) {
  if (!cart) { remember(undefined); set({ id: undefined, checkoutUrl: undefined, lines: [], count: 0, subtotal: undefined }); return; }
  remember(cart.id);
  set({
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    count: cart.totalQuantity,
    subtotal: formatMoney(cart.cost.subtotalAmount),
    lines: cart.lines.nodes.map(l => ({
      id: l.id,
      quantity: l.quantity,
      title: l.merchandise.product.title,
      variantTitle: l.merchandise.title === 'Default Title' ? '' : l.merchandise.title,
      price: formatMoney(l.merchandise.price),
      image: l.merchandise.image?.url,
    })),
  });
}

async function run<T extends { cart: CartNode | null; userErrors: UserError[] }>(key: string, query: string, vars: Record<string, unknown>) {
  set({ busy: true, error: undefined });
  try {
    const data = await storefront<Record<string, T>>(query, vars);
    const result = data[key];
    if (result.userErrors.length) throw new Error(result.userErrors.map(e => e.message).join(' '));
    apply(result.cart);
  } catch (err) {
    set({ error: `The cart couldn't be updated (${(err as Error).message}). Try again in a moment.` });
  } finally {
    set({ busy: false });
  }
}

let started = false;
/** Restore a saved cart once per page load. Carts that were checked out or expired come back null. */
export async function initCart() {
  if (started) return;
  started = true;
  let id: string | null = null;
  try { id = localStorage.getItem(STORAGE_KEY); } catch { /* storage blocked */ }
  if (!id) return;
  try {
    const data = await storefront<{ cart: CartNode | null }>(`query ($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`, { id });
    apply(data.cart);
  } catch { /* keep the id; a later add will retry */ }
}

export async function addToCart(variantId: string, quantity = 1) {
  set({ open: true });
  const lines = [{ merchandiseId: variantId, quantity }];
  if (state.id) {
    await run('cartLinesAdd', `mutation ($id: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $id, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`, { id: state.id, lines });
    if (!state.error) return;
    // The saved cart may have expired or been checked out; start a new one.
    apply(null);
    set({ error: undefined });
  }
  await run('cartCreate', `mutation ($lines: [CartLineInput!]!) { cartCreate(input: { lines: $lines }) { cart { ${CART_FIELDS} } userErrors { message } } }`, { lines });
}

export function setQuantity(lineId: string, quantity: number) {
  if (!state.id) return;
  return quantity <= 0
    ? run('cartLinesRemove', `mutation ($id: ID!, $ids: [ID!]!) { cartLinesRemove(cartId: $id, lineIds: $ids) { cart { ${CART_FIELDS} } userErrors { message } } }`, { id: state.id, ids: [lineId] })
    : run('cartLinesUpdate', `mutation ($id: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $id, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`, { id: state.id, lines: [{ id: lineId, quantity }] });
}

export const openCart = (open: boolean) => set({ open });
