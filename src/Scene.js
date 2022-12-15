import { Scroll, ScrollControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React from 'react'
import * as THREE from 'three'
import { Html } from './Components/Html'
import { Particles } from './Components/Particles'
import { Cubes } from './Components/Cubes'
import { Objects } from './Components/Objects'
import { LayerMaterial, Depth } from 'lamina'
import { Tetrahedrons } from './Components/Tetrahedons'

function Scene() {
  const material = new THREE.MeshBasicMaterial({
    vertexColors: true,
    color: '#FFFFFF'
  })
  useFrame(({ mouse, camera }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.5, 0.03)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.8, 0.01)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, Math.max(4, Math.abs(mouse.x * mouse.y * 8)), 0.01)
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, mouse.x * -Math.PI * 0.025, 0.001)
  })

  return (
    <ScrollControls pages={8}>
      <Bg />
      <Scroll>
        <Tetrahedrons material={material} />
        <Particles />
        <Cubes count={50} />
        <Objects material={material} />
      </Scroll>
      <Scroll html>
        <Html />
      </Scroll>
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

export { Scene }
