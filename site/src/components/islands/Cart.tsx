import { useEffect, useRef, useSyncExternalStore } from 'react';
import { cartStore, initCart, openCart, setQuantity } from '../../lib/cart';

/** "Cart (n)" in the nav (shown once something's in it) and the slide-out cart panel. */
export function Cart() {
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.get, cartStore.get);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => { initCart(); }, []);
  useEffect(() => {
    if (!cart.open) return;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') openCart(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [cart.open]);

  return (
    <>
      {cart.count > 0 && (
        <button type="button" className="navchip cartchip" onClick={() => openCart(true)} aria-haspopup="dialog">
          Cart ({cart.count})
        </button>
      )}
      {cart.open && (
        <div className="cartlayer" onClick={() => openCart(false)}>
          <div className="cartpanel" role="dialog" aria-modal="true" aria-label="Your cart" tabIndex={-1} ref={panel} onClick={e => e.stopPropagation()}>
            <div className="cartpanel__head">
              <span className="cartpanel__title">Your Cart</span>
              <button type="button" className="cartpanel__close" aria-label="Close cart" onClick={() => openCart(false)}>×</button>
            </div>

            {cart.error && <p className="cartpanel__error" role="alert">{cart.error}</p>}

            {cart.lines.length === 0 ? (
              <p className="cartpanel__empty">{cart.busy ? 'Adding…' : 'Your cart is empty.'}</p>
            ) : (
              <ul className="cartlines">
                {cart.lines.map(l => (
                  <li key={l.id} className="cartline">
                    {l.image ? <img className="cartline__img" src={l.image} alt="" /> : <div className="cartline__img" />}
                    <div className="cartline__info">
                      <div className="cartline__title">{l.title}</div>
                      {l.variantTitle && <div className="cartline__variant">{l.variantTitle}</div>}
                      <div className="cartline__price">{l.price}</div>
                      <div className="cartline__qty">
                        <button type="button" aria-label={`One fewer ${l.title}`} disabled={cart.busy} onClick={() => setQuantity(l.id, l.quantity - 1)}>−</button>
                        <span aria-live="polite">{l.quantity}</span>
                        <button type="button" aria-label={`One more ${l.title}`} disabled={cart.busy} onClick={() => setQuantity(l.id, l.quantity + 1)}>+</button>
                        <button type="button" className="cartline__remove" disabled={cart.busy} onClick={() => setQuantity(l.id, 0)}>Remove</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {cart.lines.length > 0 && (
              <div className="cartpanel__foot">
                <div className="cartpanel__subtotal"><span>Subtotal</span><span>{cart.subtotal}</span></div>
                <p className="cartpanel__note">Shipping and taxes are calculated at checkout.</p>
                <a className="ds-subscribe ds-subscribe--primary cartpanel__checkout" href={cart.checkoutUrl} aria-disabled={cart.busy}>Check Out</a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
