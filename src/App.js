import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'

export default function App() {
  return (
    <Canvas gl={{ antialias: false }} frameloop="demand">
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <Scene />
      </Suspense>
    </Canvas>
  )
}
