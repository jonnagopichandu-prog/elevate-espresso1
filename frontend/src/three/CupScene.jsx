import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import CupMesh from './CupMesh.jsx';
import OrbitBeans from './OrbitBeans.jsx';
import OrbitRings from './OrbitRings.jsx';
import ScatterBeans from './ScatterBeans.jsx';
import SceneLights from './SceneLights.jsx';

function Rig() {
  useFrame((s) => {
    const cam = s.camera;
    cam.position.x += (s.pointer.x * 0.55 - cam.position.x) * 0.045;
    cam.position.y += (2.15 + s.pointer.y * 0.3 - cam.position.y) * 0.045;
    cam.lookAt(0, 0.95, 0);
  });
  return null;
}

export default function CupScene() {
  return (
    <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 2.15, 6.6], fov: 34 }} gl={{ alpha: true, antialias: true }}>
      <Rig />
      <Suspense fallback={null}>
        <SceneLights />
        <Float speed={1.3} rotationIntensity={0.1} floatIntensity={0.45} floatingRange={[-0.04, 0.1]}>
          <CupMesh scale={1.02} />
        </Float>
        <OrbitBeans count={9} />
        <OrbitRings radius={2.3} y={0.95} />
        <ScatterBeans count={20} rMin={1.9} rMax={3.4} />
        <GroundFade y={-0.005} />
        <ContactShadows position={[0, 0.005, 0]} opacity={0.65} scale={13} blur={2.6} far={3.2} color="#000000" />
      </Suspense>
    </Canvas>
  );
}
