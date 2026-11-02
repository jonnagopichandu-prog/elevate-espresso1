import { useMemo } from 'react';
import Bean from './Bean.jsx';

export default function ScatterBeans({ count = 22, rMin = 1.6, rMax = 3.6, y = 0.03 }) {
  const beans = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 * 3.7 + Math.abs(Math.sin(i * 7.3)) * 2;
        const r = rMin + Math.abs(Math.sin(i * 12.9)) * (rMax - rMin);
        return {
          pos: [Math.cos(a) * r, y, Math.sin(a) * r],
          rot: [0, Math.abs(Math.sin(i * 3.1)) * Math.PI, Math.abs(Math.cos(i * 2.7)) * 0.5],
          scale: 0.5 + Math.abs(Math.sin(i * 5.7)) * 0.45,
        };
      }),
    [count, rMin, rMax, y]
  );
  return beans.map((b, i) => (
    <Bean key={i} position={b.pos} rotation={b.rot} scale={b.scale} />
  ));
}
