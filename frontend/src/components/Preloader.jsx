import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '../context/StoreContext.jsx';
import Logo from './Logo.jsx';
import Guard3D from './Guard3D.jsx';
import LoaderScene from '../three/LoaderScene.jsx';
import '../styles/loader.css';

export default function Preloader() {
  const { setScreen, user } = useStore();
  const [pct, setPct] = useState(0);
  const root = useRef();
  const done = useRef(false);

  const finish = () => {
    gsap.to(root.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete: () => setScreen(user ? 'app' : 'login'),
    });
  };

  useEffect(() => {
    const iv = setInterval(() => {
      setPct((p) => {
        if (p >= 100) return 100;
        const next = Math.min(100, p + (p < 70 ? 4 + Math.random() * 7 : 7 + Math.random() * 10));
        if (next >= 100 && !done.current) {
          done.current = true;
          clearInterval(iv);
          setTimeout(finish, 550);
        }
        return next;
      });
    }, 140);
    return () => clearInterval(iv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="preloader" ref={root} data-testid="preloader">
      <div className="preloader-bg" />
      <div className="preloader-canvas">
        <Guard3D fallback={null}>
          <LoaderScene />
        </Guard3D>
      </div>
      <div className="preloader-core">
        <div className="pl-ring">
          <Logo withText={false} size={52} />
          <span className="pl-word">Elevate</span>
          <span className="pl-word pl-word-gold">Espresso</span>
        </div>
        <p className="pl-status" data-testid="loader-status">Brewing Your Experience...</p>
        <div className="pl-bar" data-testid="loader-progress-bar">
          <span style={{ width: `${pct}%` }} />
        </div>
        <div className="pl-pct" data-testid="loader-percent">{Math.round(pct)}%</div>
      </div>
    </div>
  );
}
