import { PRODUCTS } from '../data';
import { Headline } from '../ds';
import { Photo } from '../components/Photo';
import { STORE_URL } from '../lib/links';

export function Shop() {
  return (
    <div className="simplepage">
      <Headline level="xl" as="h1">Shop</Headline>
      <div className="shop__intro">Print issues, stickers, and other analog proof you read a satirical newspaper. Fulfilled via Printful. Proceeds fund the next print run.</div>
      <div className="shop__grid">
        {PRODUCTS.map(p => (
          <div key={p.slotId} className="shop__item">
            {p.photo ? <Photo className="shop__photo" src={p.photo} /> : <Photo className="shop__photo" />}
            <div className="shop__title">{p.title}</div>
            <div className="shop__desc">{p.desc}</div>
            <div className="shop__buy">
              <span className="shop__price">{p.price}</span>
              <a className="ds-subscribe ds-subscribe--secondary" href={STORE_URL} target="_blank" rel="noopener">Add to Cart</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
