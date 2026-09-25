import { useState, useSyncExternalStore } from 'react';
import type { ShopVariant } from '../../data/shop';
import { addToCart, cartStore } from '../../lib/cart';
import { STORE_URL } from '../../lib/links';

/**
 * Size/style picker (when there's more than one variant) plus Add to Cart.
 * Fallback products have no variants and link to the old store instead.
 */
export function AddToCart({ variants, label = 'Add to Cart', block, idPrefix }: { variants: ShopVariant[]; label?: string; block?: boolean; idPrefix: string }) {
  const firstAvailable = variants.find(v => v.available) ?? variants[0];
  const [variantId, setVariantId] = useState(firstAvailable?.id);
  const { busy } = useSyncExternalStore(cartStore.subscribe, cartStore.get, cartStore.get);
  const btn = `ds-subscribe ds-subscribe--secondary addtocart__btn${block ? ' addtocart__btn--block' : ''}`;

  if (!variants.length) return <a className={btn} href={STORE_URL} target="_blank" rel="noopener">{label}</a>;

  const chosen = variants.find(v => v.id === variantId);
  const soldOut = !chosen?.available;
  return (
    <div className={`addtocart${block ? ' addtocart--block' : ''}`}>
      {variants.length > 1 && (
        <select id={`${idPrefix}-variant`} className="addtocart__select" aria-label="Option" value={variantId} onChange={e => setVariantId(e.target.value)}>
          {variants.map(v => <option key={v.id} value={v.id} disabled={!v.available}>{v.title}{v.available ? '' : ' (sold out)'}</option>)}
        </select>
      )}
      <button type="button" className={btn} disabled={soldOut || busy} onClick={() => variantId && addToCart(variantId)}>
        {soldOut ? 'Sold Out' : busy ? 'Adding…' : label}
      </button>
    </div>
  );
}
