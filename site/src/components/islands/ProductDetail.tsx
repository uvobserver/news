import { useState, type ReactNode } from 'react';
import type { ShopProduct } from '../../data/shop';
import { AddToCart } from './AddToCart';

/**
 * Product page: gallery of every Shopify image beside the purchase column. Picking a variant shows its photo
 * and price. `children` (title) and `details` (description) come from the page as static HTML.
 */
export function ProductDetail({ product, children, details }: { product: ShopProduct; children?: ReactNode; details?: ReactNode }) {
  const images = product.images;
  const [current, setCurrent] = useState(images[0]?.src);
  // Matches the variant AddToCart preselects (first in stock).
  const initial = product.variants.find(v => v.available) ?? product.variants[0];
  const [price, setPrice] = useState(initial?.price ?? product.price);

  return (
    <div className="pdp">
      <div className="pdp__gallery">
        {current
          ? <img className="pdp__main" src={current} alt={images.find(i => i.src === current)?.alt ?? product.title} width={1200} height={1200} />
          : <div className="pdp__main placeholder">Photo</div>}
        {images.length > 1 && (
          <div className="pdp__thumbs" role="list">
            {images.map((img, i) => (
              <button key={img.src} type="button" role="listitem" className={`pdp__thumb${img.src === current ? ' is-active' : ''}`}
                aria-label={`Show image ${i + 1} of ${images.length}`} aria-pressed={img.src === current} onClick={() => setCurrent(img.src)}>
                <img src={img.thumb} alt="" width={120} height={120} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="pdp__info">
        {children}
        <div className="pdp__price">{price}</div>
        <div className="pdp__buy">
          <AddToCart
            variants={product.variants} idPrefix={`pdp-${product.handle}`} block
            onVariantChange={v => { setPrice(v.price); if (v.image) setCurrent(v.image); }}
          />
        </div>
        {details}
      </div>
    </div>
  );
}
