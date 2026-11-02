import * as THREE from 'three';

const bodyMat = new THREE.MeshStandardMaterial({ color: '#2b160c', roughness: 0.42, metalness: 0.06, envMapIntensity: 0.85 });
const seamMat = new THREE.MeshStandardMaterial({ color: '#0d0603', roughness: 0.6, metalness: 0 });

export default function Bean({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, ...rest }) {
  return (
    <group position={position} rotation={rotation} scale={scale} {...rest}>
      <group scale={[1, 0.62, 0.55]}>
        <mesh material={bodyMat} castShadow>
          <sphereGeometry args={[0.5, 28, 28]} />
        </mesh>
        <mesh material={seamMat}>
          <torusGeometry args={[0.5, 0.022, 10, 48, Math.PI]} />
        </mesh>
      </group>
    </group>
  );
}
