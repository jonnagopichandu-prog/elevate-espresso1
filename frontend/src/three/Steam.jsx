import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { steamTexture } from '../utils/textures.js';

export default function Steam({ position = [0, 0, 0], count = 110, height = 2.6, spread = 0.32, size = 0.4, color = '#ffe6c4', opacity = 0.5 }) {
  const ref = useRef();
  const tex = useMemo(steamTexture, []);
  const { positions, data } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        t: Math.random(),
        speed: 0.24 + Math.random() * 0.2,
        r: Math.random() * spread,
        a: Math.random() * Math.PI * 2,
        sway: 0.6 + Math.random() * 1.3,
        ph: Math.random() * Math.PI * 2,
        off: (Math.random() - 0.5) * spread * 1.2,
      });
    }
    return { positions, data };
  }, [count, spread]);

  useFrame((s, dt) => {
    const attr = ref.current?.geometry?.attributes?.position;
    if (!attr) return;
    const time = s.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const d = data[i];
      d.t += d.speed * dt;
      if (d.t > 1) d.t -= 1;
      const y = d.t * height;
      const wob = Math.sin(time * d.sway + d.ph + y * 2.1) * (0.06 + y * 0.15);
      const grow = 0.25 + d.t * 1.15;
      attr.setXYZ(i, d.off + Math.cos(d.a) * d.r * grow + wob, y, Math.sin(d.a) * d.r * grow + Math.cos(time * 0.8 + d.ph) * 0.04);
    }
    attr.needsUpdate = true;
  });

  return (
    <group position={position}>
      <points ref={ref} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial map={tex} size={size} sizeAttenuation transparent depthWrite={false} opacity={opacity} color={color} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}
