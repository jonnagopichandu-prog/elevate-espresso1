import { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';
import { bagTexture } from '../utils/textures.js';

export default function BagMesh({ variant = 'house' }) {
  const tex = useMemo(() => bagTexture(variant), [variant]);
  const body = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0e0805', roughness: 0.5, metalness: 0.2, envMapIntensity: 1 }), []);
  const crimp = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0a0503', roughness: 0.65, metalness: 0.15 }), []);
  const front = useMemo(() => new THREE.MeshStandardMaterial({ map: tex, roughness: 0.48, metalness: 0.22, envMapIntensity: 1.1 }), [tex]);

  return (
    <group rotation={[0.04, -0.35, 0]}>
      <RoundedBox args={[1.42, 2.0, 0.46]} radius={0.05} smoothness={4} material={body} castShadow />
      <mesh position={[0, 0, 0.233]} material={front}>
        <planeGeometry args={[1.3, 1.88]} />
      </mesh>
      <mesh position={[0, 1.05, 0]} material={crimp} castShadow>
        <boxGeometry args={[1.5, 0.1, 0.52]} />
      </mesh>
      <mesh position={[0, -1.05, 0]} material={crimp} castShadow>
        <boxGeometry args={[1.5, 0.1, 0.52]} />
      </mesh>
    </group>
  );
}
