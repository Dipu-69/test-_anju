import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'

function Shape() {
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh>
        <torusKnotGeometry args={[0.8, 0.28, 256, 32]} />
        <meshStandardMaterial color="#69a3ff" metalness={0.4} roughness={0.2} />
      </mesh>
    </Float>
  )
}

export default function BrainScene() {
  return (
    <div className="h-[360px] rounded-xl overflow-hidden">
      <Canvas dpr={[1, 2]} camera={{ position: [2.2, 1.6, 2.2], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />
        <pointLight position={[-3, -2, -2]} intensity={0.6} color="#33d6a6" />
        <Shape />
        <OrbitControls enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={(2 * Math.PI) / 3} />
      </Canvas>
    </div>
  )
}