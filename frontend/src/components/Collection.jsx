import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShoppingBag, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';
import { PRODUCTS, inr } from '../data/products.js';
import { bagThumb } from '../utils/textures.js';
import Guard3D from './Guard3D.jsx';
import BagCardScene from '../three/BagCardScene.jsx';
import '../styles/collection.css';

function BagCard({ product }) {
  const { addToCart } = useStore();
  const visual = useRef();
  const inView = useInView(visual, { once: true, margin: '300px 0px' });
  return (
    <article className="bag-card" data-testid={`product-card-${product.id}`}>
      <div className="bag-visual" ref={visual}>
        {inView ? (
          <Guard3D fallback={<img src={bagThumb(product.variant)} alt={product.name} className="bag-fallback" />}>
            <BagCardScene variant={product.variant} />
          </Guard3D>
        ) : null}
      </div>
      <h3>{product.name}</h3>
      <div className="bag-rating" data-testid={`rating-${product.id}`}>
        <Star size={13} fill="#e2a34e" color="#e2a34e" />
        <strong>{product.rating.toFixed(1)}</strong>
        <span>({product.reviews})</span>
      </div>
      <div className="bag-price">{inr(product.price)}</div>
      <button className="btn-gold btn-sm" onClick={() => addToCart(product)} data-testid={`add-to-cart-${product.id}`}>
        <ShoppingBag size={14} /> Add to Cart
      </button>
    </article>
  );
}

export default function Collection() {
  const track = useRef();
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setPages(Math.max(1, Math.round(el.scrollWidth / el.clientWidth)));
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const slide = (dir) => {
    const el = track.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.95, behavior: 'smooth' });
  };

  return (
    <section id="shop" className="collection">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow" data-reveal>Our Collection</span>
          <h2 data-reveal>Signature Coffee Range</h2>
          <p data-reveal>Explore our handpicked selection of premium coffee blends, roasted to perfection.</p>
        </div>
        <div className="collection-slider" data-reveal>
          <button className="slider-arrow left" onClick={() => slide(-1)} aria-label="Previous blends" data-testid="collection-prev-button">
            <ArrowLeft size={18} />
          </button>
          <div className="collection-track" ref={track} onScroll={measure} data-testid="collection-track">
            {PRODUCTS.map((p) => (
              <BagCard key={p.id} product={p} />
            ))}
          </div>
          <button className="slider-arrow right" onClick={() => slide(1)} aria-label="Next blends" data-testid="collection-next-button">
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="collection-dots" data-testid="collection-dots">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              className={i === page ? 'on' : ''}
              onClick={() => track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: 'smooth' })}
              aria-label={`Go to blends page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
