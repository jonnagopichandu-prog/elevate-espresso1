import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { latteTexture, cupBrandTexture } from '../utils/textures.js';
import Steam from './Steam.jsx';
import GroundFade from './GroundFade.jsx';

const ceramic = new THREE.MeshPhysicalMaterial({
  color: '#0b0605',
  roughness: 0.28,
  metalness: 0.12,
  clearcoat: 1,
  clearcoatRoughness: 0.18,
  envMapIntensity: 1.4,
  side: THREE.DoubleSide,
});

export default function CupMesh({ steam = true, scale = 1, spin = true }) {
  const latte = useMemo(latteTexture, []);
  const brand = useMemo(cupBrandTexture, []);
  const g = useRef();

  const cupGeo = useMemo(() => {
    const pts = [[0.01, 0], [0.4, 0], [0.56, 0.05], [0.66, 0.24], [0.78, 0.68], [0.89, 1.16], [0.93, 1.36], [0.94, 1.42]].map(
      (p) => new THREE.Vector2(p[0], p[1])
    );
    return new THREE.LatheGeometry(pts, 72);
  }, []);

  const saucerGeo = useMemo(() => {
    const pts = [[0.03, 0.015], [0.42, 0.05], [0.85, 0.12], [1.45, 0.17], [1.66, 0.26], [1.69, 0.32], [1.62, 0.33], [0.6, 0.24]].map(
      (p) => new THREE.Vector2(p[0], p[1])
    );
    return new THREE.LatheGeometry(pts, 80);
  }, []);

  const handleGeo = useMemo(() => new THREE.TorusGeometry(0.33, 0.078, 22, 44, Math.PI * 1.3), []);
  const rimGeo = useMemo(() => new THREE.TorusGeometry(0.925, 0.03, 16, 72), []);

  useFrame((s) => {
    if (spin && g.current) g.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.22) * 0.55;
  });

  return (
    <group scale={scale}>
      <mesh geometry={saucerGeo} material={ceramic} castShadow receiveShadow />
      <group ref={g} position={[0, 0.14, 0]}>
        <mesh geometry={cupGeo} material={ceramic} castShadow receiveShadow />
        <mesh geometry={handleGeo} material={ceramic} position={[0.99, 0.68, 0]} rotation={[0, 0, -0.35]} castShadow />
        <mesh geometry={rimGeo} material={ceramic} position={[0, 1.42, 0]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.36, 0]}>
          <circleGeometry args={[0.87, 48]} />
          <meshStandardMaterial map={latte} roughness={0.2} metalness={0.05} envMapIntensity={0.6} />
        </mesh>
        <mesh position={[0, 0.72, 0]} rotation={[0, Math.PI, 0]}>
          <cylinderGeometry args={[0.86, 0.78, 0.6, 64, 1, true]} />
          <meshStandardMaterial
            map={brand}
            transparent
            roughness={0.35}
            metalness={0.55}
            envMapIntensity={1.1}
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </mesh>
        {steam && <Steam position={[0, 1.5, 0]} height={2.7} count={130} size={0.4} />}
      </group>
    </group>
  );
}
