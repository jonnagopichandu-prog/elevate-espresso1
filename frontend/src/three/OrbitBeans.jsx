import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Bean from './Bean.jsx';

function Orbiting({ a, b, speed, phase, amp, base, scale, spin }) {
  const ref = useRef();
  useFrame((s) => {
    const t = s.clock.elapsedTime * speed + phase;
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * a, base + Math.sin(t * 1.6 + phase) * amp, Math.sin(t) * b);
      ref.current.rotation.x = t * spin;
      ref.current.rotation.z = t * spin * 0.6;
    }
  });
  return (
    <group ref={ref} scale={scale}>
      <Bean />
    </group>
  );
}

export default function OrbitBeans({ count = 9, base = 1.1 }) {
  const beans = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        a: 2.1 + Math.abs(Math.sin(i * 4.7)) * 1.5,
        b: 1.4 + Math.abs(Math.cos(i * 2.9)) * 1.0,
        speed: 0.22 + Math.abs(Math.sin(i * 8.3)) * 0.25,
        phase: (i / count) * Math.PI * 2,
        amp: 0.25 + Math.abs(Math.sin(i * 5.1)) * 0.4,
        scale: 0.5 + Math.abs(Math.sin(i * 6.7)) * 0.45,
        spin: 0.9 + Math.abs(Math.sin(i)) * 0.8,
      })),
    [count]
  );
  return (
    <group rotation={[0.06, 0, -0.05]}>
      {beans.map((b, i) => (
        <Orbiting key={i} {...b} base={base} />
      ))}
    </group>
  );
}
