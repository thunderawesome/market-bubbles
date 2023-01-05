import { Scroll, ScrollControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Cubes } from './Components/Cubes'
import { LayerMaterial, Depth } from 'lamina'
import useQuote from './Hooks/useQuote'
import Lines from './Components/Lines'
import { useControls } from 'leva'

export default function Scene() {
  const { qCount } = useQuote('')

  const { dash, count, radius } = useControls({
    dash: { value: 0.99, min: 0, max: 0.99, step: 0.01 },
    count: { value: 100, min: 0, max: 200, step: 1 },
    radius: { value: 10, min: 1, max: 100, step: 1 }
  })

  useFrame(({ mouse, camera }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.5, 0.03)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.8, 0.01)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, Math.max(4, Math.abs(mouse.x * mouse.y * 8)), 0.01)
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, mouse.x * -Math.PI * 0.025, 0.001)
  })

  return (
    <ScrollControls pages={1}>
      <Bg />
      <Scroll>
        <Cubes count={qCount} />
      </Scroll>
      <Lines dash={dash} count={count} radius={radius} />
    </ScrollControls>
  )
}

function Bg() {
  return (
    <mesh scale={100}>
      <boxGeometry args={[1, 1, 1]} />
      <LayerMaterial side={THREE.BackSide}>
        <Depth colorB="darkblue" colorA="skyblue" alpha={1} mode="normal" near={130} far={200} origin={[100, 100, -100]} />
      </LayerMaterial>
    </mesh>
  )
}
