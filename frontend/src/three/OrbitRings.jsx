import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { glowTexture } from '../utils/textures.js';

export default function OrbitRings({ radius = 2.3, y = 0.9, particleCount = 160 }) {
  const ring1 = useRef();
  const ring2 = useRef();
  const pts = useRef();
  const tex = useMemo(glowTexture, []);
  const angles = useMemo(
    () => Array.from({ length: particleCount }, (_, i) => (i / particleCount) * Math.PI * 2 + Math.random() * 0.4),
    [particleCount]
  );
  const speeds = useMemo(
    () => Array.from({ length: particleCount }, () => 0.18 + Math.random() * 0.4),
    [particleCount]
  );
  const positions = useMemo(() => new Float32Array(particleCount * 3), [particleCount]);

  useFrame((s, dt) => {
    if (ring1.current) ring1.current.rotation.z += dt * 0.14;
    if (ring2.current) ring2.current.rotation.z -= dt * 0.1;
    const attr = pts.current?.geometry?.attributes?.position;
    if (attr) {
      const t = s.clock.elapsedTime;
      for (let i = 0; i < particleCount; i++) {
        angles[i] += speeds[i] * dt;
        const a = angles[i];
        attr.setXYZ(i, Math.cos(a) * radius, Math.sin(a) * radius * 0.86, Math.sin(a * 2 + t) * 0.06);
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <group position={[0, y, 0]}>
      <group ref={ring1} rotation={[Math.PI / 2 + 0.16, 0, 0.12]}>
        <mesh>
          <torusGeometry args={[radius, 0.0085, 8, 160]} />
          <meshBasicMaterial color="#e2a34e" transparent opacity={0.75} toneMapped={false} />
        </mesh>
        <mesh>
          <torusGeometry args={[radius, 0.032, 8, 160]} />
          <meshBasicMaterial color="#ffb45e" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </mesh>
        <points ref={pts} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          </bufferGeometry>
          <pointsMaterial map={tex} size={0.1} sizeAttenuation transparent depthWrite={false} color="#ffd9a0" blending={THREE.AdditiveBlending} opacity={0.9} toneMapped={false} />
        </points>
      </group>
      <group ref={ring2} rotation={[Math.PI / 2 - 0.22, 0.3, -0.14]}>
        <mesh>
          <torusGeometry args={[radius * 1.32, 0.006, 8, 160]} />
          <meshBasicMaterial color="#ffb45e" transparent opacity={0.4} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
