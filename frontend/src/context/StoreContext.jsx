import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

const StoreContext = createContext(null);
export const useStore = () => useContext(StoreContext);

const read = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v ?? fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [screen, setScreen] = useState('loading');
  const [user, setUser] = useState(() => read('ee_user', null));
  const [cart, setCart] = useState(() => read('ee_cart', []));
  const [cartOpen, setCartOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(() => read('ee_order', null));

  useEffect(() => {
    localStorage.setItem('ee_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((p) => {
    setCart((c) => {
      const found = c.find((i) => i.id === p.id);
      if (found) return c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { id: p.id, name: p.name, sub: p.sub, price: p.price, variant: p.variant, qty: 1 }];
    });
    toast.success(`${p.name} added to your bag`);
  }, []);

  const setQty = useCallback((id, delta) => {
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)));
  }, []);

  const removeItem = useCallback((id) => {
    setCart((c) => c.filter((i) => i.id !== id));
  }, []);

  const { count, subtotal } = useMemo(
    () => ({
      count: cart.reduce((a, i) => a + i.qty, 0),
      subtotal: cart.reduce((a, i) => a + i.qty * i.price, 0),
    }),
    [cart]
  );

  const signIn = useCallback((email) => {
    const u = { email, name: email.split('@')[0] };
    localStorage.setItem('ee_user', JSON.stringify(u));
    setUser(u);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('ee_user');
    setUser(null);
    setScreen('login');
  }, []);

  const checkout = useCallback(() => {
    if (!cart.length) return;
    const order = {
      id: 'EE' + String(Date.now()).slice(-6),
      items: cart,
      subtotal,
      delivery: 0,
      total: subtotal,
      placedAt: new Date().toISOString(),
    };
    localStorage.setItem('ee_order', JSON.stringify(order));
    setLastOrder(order);
    setCart([]);
    setCartOpen(false);
    setScreen('success');
  }, [cart, subtotal]);

  const trackOrder = useCallback(() => {
    setScreen('app');
    toast.success(`Order ${lastOrder ? lastOrder.id : ''} confirmed — arriving in ~45 mins`);
  }, [lastOrder]);

  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70, duration: 1.3 });
    else el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const value = useMemo(
    () => ({
      screen, setScreen, user, signIn, signOut, cart, addToCart, setQty, removeItem,
      count, subtotal, cartOpen, setCartOpen, lastOrder, checkout, trackOrder, scrollToId,
    }),
    [screen, user, signIn, signOut, cart, addToCart, setQty, removeItem, count, subtotal, cartOpen, lastOrder, checkout, trackOrder, scrollToId]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
