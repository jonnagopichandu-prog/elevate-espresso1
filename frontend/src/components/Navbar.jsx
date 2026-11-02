import { useEffect, useState } from 'react';
import { LogOut, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';
import { PRODUCTS } from '../data/products.js';
import Logo from './Logo.jsx';
import '../styles/nav.css';

const LINKS = [
  ['home', 'Home'],
  ['shop', 'Shop'],
  ['story', 'Our Story'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
];

export default function Navbar() {
  const { count, setCartOpen, user, signOut, scrollToId, setScreen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    LINKS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  const results = query.trim() ? PRODUCTS.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase())) : [];

  return (
    <>
      <header className={`nav${scrolled ? ' nav-scrolled' : ''}`}>
        <div className="nav-inner container">
          <button className="nav-logo" onClick={() => go('home')} data-testid="nav-logo-button" aria-label="Elevate Espresso home">
            <Logo size={38} />
          </button>
          <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
            {LINKS.map(([id, label]) => (
              <button key={id} className={`nav-link${active === id ? ' active' : ''}`} onClick={() => go(id)} data-testid={`nav-link-${id}`}>
                {label}
              </button>
            ))}
          </nav>
          <div className="nav-actions">
            <div className={`nav-search${searchOpen ? ' open' : ''}`}>
              <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search" data-testid="nav-search-toggle">
                <Search size={18} />
              </button>
              {searchOpen && (
                <div className="nav-search-panel">
                  <input
                    autoFocus
                    placeholder="Search our collection..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    data-testid="nav-search-input"
                  />
                  {results.length > 0 && (
                    <ul className="nav-search-results">
                      {results.map((p) => (
                        <li key={p.id}>
                          <button
                            onClick={() => {
                              go('shop');
                              setSearchOpen(false);
                              setQuery('');
                            }}
                          >
                            {p.name}
                            <span>₹{p.price}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {query.trim() && results.length === 0 && <p className="nav-search-empty">No blends match "{query}"</p>}
                </div>
              )}
            </div>
            <div className="nav-user">
              <button
                onClick={() => (user ? setUserMenu(!userMenu) : setScreen('login'))}
                aria-label="Account"
                data-testid="nav-account-button"
              >
                <User size={18} />
              </button>
              {userMenu && user && (
                <div className="nav-user-menu" data-testid="nav-user-menu">
                  <p className="nav-user-email">{user.email}</p>
                  <button
                    onClick={() => {
                      setUserMenu(false);
                      signOut();
                    }}
                    data-testid="nav-signout-button"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
            <button className="nav-cart" onClick={() => setCartOpen(true)} aria-label="Open bag" data-testid="nav-cart-button">
              <ShoppingBag size={18} />
              {count > 0 && <span className="nav-cart-badge" data-testid="nav-cart-badge">{count}</span>}
            </button>
            <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" data-testid="nav-burger-button">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      {menuOpen && <div className="nav-backdrop" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
