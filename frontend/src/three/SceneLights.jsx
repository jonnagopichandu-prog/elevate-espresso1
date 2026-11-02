import { Environment, Lightformer } from '@react-three/drei';

export default function SceneLights({ spot = 160 }) {
  return (
    <>
      <ambientLight intensity={0.55} color="#3a2213" />
      <spotLight
        position={[5, 7, 4]}
        angle={0.55}
        penumbra={1}
        intensity={spot}
        color="#ffb45e"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />
      <pointLight position={[-4.5, 2.2, -3.5]} intensity={70} color="#ff7a18" />
      <pointLight position={[0, 1.4, 4.5]} intensity={22} color="#e2a34e" />
      <directionalLight position={[3, 6, 2]} intensity={1.2} color="#ffdfb0" castShadow shadow-mapSize={[1024, 1024]} />
      <Environment resolution={256}>
        <Lightformer intensity={5} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} color="#ffb45e" />
        <Lightformer intensity={3} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} color="#ff7a18" />
        <Lightformer intensity={3.5} position={[5, 1, 0]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} color="#e2a34e" />
        <Lightformer intensity={1.5} position={[0, 2, 6]} scale={[8, 3, 1]} color="#f5e9d8" />
      </Environment>
    </>
  );
}
