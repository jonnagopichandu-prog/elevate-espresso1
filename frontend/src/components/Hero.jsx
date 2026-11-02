import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Mouse, Play } from 'lucide-react';
import { useStore } from '../context/StoreContext.jsx';
import Guard3D from './Guard3D.jsx';
import CupScene from '../three/CupScene.jsx';
import '../styles/hero.css';

export default function Hero() {
  const { scrollToId } = useStore();
  const root = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-eyebrow', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.15, ease: 'power3.out' });
      gsap.fromTo(
        '.hero h1 .line > span',
        { yPercent: 112 },
        { yPercent: 0, duration: 1.15, stagger: 0.13, ease: 'power4.out', delay: 0.25 }
      );
      gsap.fromTo('.hero-sub, .hero-cta, .hero-scroll', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.95, stagger: 0.12, delay: 0.8, ease: 'power3.out' });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="hero" ref={root}>
      <div className="hero-glow" />
      <div className="hero-inner container">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">Premium Coffee Experience</span>
          <h1>
            <span className="line"><span>Elevate</span></span>
            <span className="line"><span>Your Coffee</span></span>
            <span className="line"><span>Experience</span></span>
          </h1>
          <p className="hero-sub">
            Specialty coffee, thoughtfully sourced, expertly roasted, and crafted for those who appreciate the finer brew.
          </p>
          <div className="hero-cta">
            <button className="btn-gold" onClick={() => scrollToId('shop')} data-testid="hero-shop-button">
              Shop Coffee <ArrowRight size={16} />
            </button>
            <button className="btn-outline" onClick={() => scrollToId('story')} data-testid="hero-story-button">
              <Play size={15} /> Watch Story
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <Guard3D fallback={<img src="/img/beans-bg.jpg" alt="Elevate Espresso coffee" className="hero-fallback" />}>
            <CupScene />
          </Guard3D>
        </div>
      </div>
      <button className="hero-scroll" onClick={() => scrollToId('shop')} data-testid="hero-scroll-button">
        <Mouse size={16} /> Scroll Down
      </button>
    </section>
  );
}
