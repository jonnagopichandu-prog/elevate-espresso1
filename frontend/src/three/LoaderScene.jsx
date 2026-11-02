import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import Bean from './Bean.jsx';

function Flyer({ seed }) {
  const ref = useRef();
  const data = useMemo(
    () => ({
      pos: [(Math.sin(seed * 12.9) * 0.5 + Math.sin(seed * 3.7)) * 5.5, Math.sin(seed * 7.1) * 3.4, -4 + Math.abs(Math.sin(seed * 9.3)) * 7],
      spin: 0.4 + Math.abs(Math.sin(seed * 5.3)) * 1.2,
      scale: 0.55 + Math.abs(Math.sin(seed * 8.9)) * 0.75,
      drift: 0.14 + Math.abs(Math.sin(seed * 2.3)) * 0.2,
    }),
    [seed]
  );
  useFrame((s, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * data.spin;
    ref.current.rotation.y += dt * data.spin * 0.7;
    ref.current.position.y += dt * data.drift;
    if (ref.current.position.y > 4.4) ref.current.position.y = -4.4;
  });
  return (
    <group ref={ref} position={data.pos} scale={data.scale}>
      <Bean />
    </group>
  );
}

export default function LoaderScene({ count = 24 }) {
  const seeds = useMemo(() => Array.from({ length: count }, (_, i) => i * 1.37 + 0.5), [count]);
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 10], fov: 52 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.8} color="#7a4a22" />
      <pointLight position={[6, 5, 7]} intensity={110} color="#ffb45e" />
      <pointLight position={[-7, -3, 4]} intensity={70} color="#ff7a18" />
      {seeds.map((s) => (
        <Flyer key={s} seed={s} />
      ))}
      <Sparkles count={140} scale={[17, 10, 8]} size={2.6} speed={0.35} color="#e2a34e" opacity={0.85} />
    </Canvas>
  );
}
