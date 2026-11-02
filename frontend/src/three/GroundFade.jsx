import { useMemo } from 'react';
import { groundTexture } from '../utils/textures.js';

export default function GroundFade({ size = 26, y = 0 }) {
  const tex = useMemo(groundTexture, []);
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}>
      <planeGeometry args={[size, size]} />
      <meshStandardMaterial map={tex} transparent roughness={0.95} metalness={0} depthWrite={false} />
    </mesh>
  );
}
