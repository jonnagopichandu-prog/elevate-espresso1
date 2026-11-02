import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float, Sparkles } from '@react-three/drei';
import BagMesh from './BagMesh.jsx';

export default function BagCardScene({ variant }) {
  return (
    <Canvas dpr={[1, 1.75]} shadows camera={{ position: [0, 0.35, 4.4], fov: 30 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.6} color="#ffcf9a" />
      <spotLight position={[3.5, 5, 4]} angle={0.5} penumbra={1} intensity={130} color="#ffb45e" castShadow shadow-mapSize={[512, 512]} />
      <pointLight position={[-3.5, 1.5, -2.5]} intensity={40} color="#ff7a18" />
      <Suspense fallback={null}>
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.65}>
          <BagMesh variant={variant} />
        </Float>
        <Sparkles count={26} scale={[2.6, 3, 1.4]} size={1.6} speed={0.25} color="#e2a34e" opacity={0.55} position={[0, 0.3, 0]} />
        <ContactShadows position={[0, -1.16, 0]} opacity={0.55} scale={5.5} blur={2.6} far={2} color="#000000" />
      </Suspense>
    </Canvas>
  );
}
