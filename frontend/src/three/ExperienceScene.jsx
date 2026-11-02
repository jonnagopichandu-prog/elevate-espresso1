import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls, Sparkles } from '@react-three/drei';
import CupMesh from './CupMesh.jsx';
import OrbitRings from './OrbitRings.jsx';
import ScatterBeans from './ScatterBeans.jsx';
import SceneLights from './SceneLights.jsx';
import GroundFade from './GroundFade.jsx';
import Bean from './Bean.jsx';

function ClickableBean({ a, b, speed, phase, base, scale, onPick }) {
  const ref = useRef();
  const pop = useRef(0);
  useFrame((s, dt) => {
    const t = s.clock.elapsedTime * speed + phase;
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * a, base + Math.sin(t * 1.5 + phase) * 0.3, Math.sin(t) * b);
      ref.current.rotation.y += dt * (0.8 + pop.current * 7);
      ref.current.rotation.x += dt * 0.5;
      pop.current *= 0.94;
      ref.current.scale.setScalar(scale * (1 + pop.current * 0.9));
    }
  });
  return (
    <group ref={ref}>
      <Bean
        onClick={(e) => {
          e.stopPropagation();
          pop.current = 1;
          onPick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      />
    </group>
  );
}

const ROCKS = [
  [2.6, -0.14, -1.2, 1.1],
  [-2.4, -0.14, 0.9, 1.4],
  [1.2, -0.1, 2.2, 0.7],
  [-1.5, -0.13, -2.3, 0.9],
];

export default function ExperienceScene({ onBeanClick }) {
  const rockGeo = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);
  const rockMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#17100b', roughness: 0.9, metalness: 0.05, flatShading: true }), []);
  const beans = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        a: 2.4 + Math.abs(Math.sin(i * 4.7)) * 1.2,
        b: 1.7 + Math.abs(Math.cos(i * 2.9)) * 0.9,
        speed: 0.2 + Math.abs(Math.sin(i * 8.3)) * 0.2,
        phase: (i / 6) * Math.PI * 2,
        scale: 0.62 + Math.abs(Math.sin(i * 6.7)) * 0.3,
      })),
    []
  );
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 2.3, 7.2], fov: 36 }} gl={{ alpha: true, antialias: true }}>
      <Suspense fallback={null}>
        <SceneLights spot={170} />
        <CupMesh scale={1.08} spin={false} />
        <OrbitRings radius={2.6} y={0.9} particleCount={200} />
        <ScatterBeans count={30} rMin={2.2} rMax={4.2} />
        {beans.map((b, i) => (
          <ClickableBean key={i} {...b} base={1.0} onPick={onBeanClick} />
        ))}
        {ROCKS.map((r, i) => (
          <mesh key={i} geometry={rockGeo} material={rockMat} position={[r[0], r[1], r[2]]} scale={[r[3], r[3] * 0.55, r[3] * 0.8]} rotation={[i, i * 1.7, 0]} castShadow receiveShadow />
        ))}
        <Sparkles count={140} scale={[10, 5, 6]} size={2.2} speed={0.3} color="#e2a34e" opacity={0.7} position={[0, 2, 0]} />
        <GroundFade y={-0.015} size={30} />
        <ContactShadows position={[0, 0.005, 0]} opacity={0.65} scale={14} blur={2.6} far={3.2} color="#000000" />
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom
        minDistance={3.6}
        maxDistance={10.5}
        maxPolarAngle={Math.PI / 2.02}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.06}
        target={[0, 0.9, 0]}
      />
    </Canvas>
  );
}
