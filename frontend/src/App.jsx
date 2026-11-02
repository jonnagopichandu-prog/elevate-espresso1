import { useEffect } from 'react';
import { Toaster } from 'sonner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { StoreProvider, useStore } from './context/StoreContext.jsx';
import Preloader from './components/Preloader.jsx';
import Login from './components/Login.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Collection from './components/Collection.jsx';
import Marquee from './components/Marquee.jsx';
import ExperienceSection from './components/ExperienceSection.jsx';
import Story from './components/Story.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Success from './components/Success.jsx';

gsap.registerPlugin(ScrollTrigger);

function Shell() {
  const { screen, cartOpen } = useStore();

  useEffect(() => {
    if (screen !== 'app') return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => {
      clearTimeout(refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [screen]);

  useEffect(() => {
    if (screen !== 'app') return;
    const els = gsap.utils.toArray('[data-reveal]');
    const tweens = els.map((el) =>
      gsap.fromTo(
        el,
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      )
    );
    return () => {
      tweens.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, [screen]);

  useEffect(() => {
    const lenis = window.__lenis;
    if (!lenis) return;
    if (cartOpen) lenis.stop();
    else lenis.start();
  }, [cartOpen]);

  return (
    <div className="app-root">
      {screen === 'loading' && <Preloader />}
      {screen === 'login' && <Login />}
      {screen === 'app' && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Collection />
            <Marquee />
            <ExperienceSection />
            <Story />
            <Footer />
          </main>
          <CartDrawer />
        </>
      )}
      {screen === 'success' && <Success />}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1A0E08',
            border: '1px solid rgba(226,163,78,0.35)',
            color: '#F5E9D8',
            fontFamily: 'Jost, sans-serif',
            letterSpacing: '0.02em',
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}
