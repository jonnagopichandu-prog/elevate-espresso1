import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';
import { inr } from '../data/products.js';
import { bagThumb } from '../utils/textures.js';
import '../styles/cart.css';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, removeItem, subtotal, checkout, scrollToId } = useStore();

  return (
    <>
      <div className={`cart-overlay${cartOpen ? ' show' : ''}`} onClick={() => setCartOpen(false)} data-testid="cart-overlay" />
      <aside className={`cart${cartOpen ? ' open' : ''}`} data-testid="cart-drawer" aria-hidden={!cartOpen}>
        <header className="cart-head">
          <h3>Your Bag ({cart.length})</h3>
          <button onClick={() => setCartOpen(false)} aria-label="Close bag" data-testid="cart-close-button">
            <X size={19} />
          </button>
        </header>
        {cart.length === 0 ? (
          <div className="cart-empty" data-testid="cart-empty">
            <ShoppingBag size={34} />
            <p>Your bag is empty.</p>
            <span>Explore the signature range and pick your brew.</span>
            <button
              className="btn-outline btn-sm"
              onClick={() => {
                setCartOpen(false);
                setTimeout(() => scrollToId('shop'), 80);
              }}
              data-testid="cart-browse-button"
            >
              Browse Coffee
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((i) => (
                <div className="cart-item" key={i.id} data-testid={`cart-item-${i.id}`}>
                  <img src={bagThumb(i.variant)} alt={i.name} className="cart-thumb" />
                  <div className="cart-item-info">
                    <h4>{i.name}</h4>
                    <span>{i.sub}</span>
                    <div className="cart-qty">
                      <button onClick={() => setQty(i.id, -1)} aria-label={`Decrease ${i.name}`} data-testid={`cart-minus-${i.id}`}>
                        <Minus size={13} />
                      </button>
                      <span data-testid={`cart-qty-${i.id}`}>{i.qty}</span>
                      <button onClick={() => setQty(i.id, 1)} aria-label={`Increase ${i.name}`} data-testid={`cart-plus-${i.id}`}>
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <button className="cart-remove" onClick={() => removeItem(i.id)} aria-label={`Remove ${i.name}`} data-testid={`cart-remove-${i.id}`}>
                      <Trash2 size={15} />
                    </button>
                    <span className="cart-item-price">{inr(i.price * i.qty)}</span>
                  </div>
                </div>
              ))}
            </div>
            <footer className="cart-foot">
              <div className="cart-row"><span>Subtotal</span><span data-testid="cart-subtotal">{inr(subtotal)}</span></div>
              <div className="cart-row"><span>Delivery</span><span data-testid="cart-delivery">{inr(0)}</span></div>
              <div className="cart-row total"><span>Total</span><span data-testid="cart-total">{inr(subtotal)}</span></div>
              <button className="btn-gold cart-checkout" onClick={checkout} data-testid="checkout-button">
                Proceed to Checkout <ArrowRight size={16} />
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
