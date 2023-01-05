import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function App() {
  return (
    <Canvas gl={{ antialias: true }}>
      {/* frameloop="demand" */}
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <Scene />
        <EffectComposer>
          <Bloom intensity={1} luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={0.5} />
          {/* <Noise opacity={0.025} />
          <Vignette eskil={false} offset={0.1} darkness={0.99} /> */}
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
