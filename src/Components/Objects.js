import { useIntersect } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Objects() {
  const { height, width } = useThree((state) => state.viewport)

  return (
    <>
      <pointLight color="blue" position={[8, -25, 5]} intensity={20} />
      <pointLight color="red" position={[0, -height * 2.25, 5]} intensity={10} />
      <Item color="red" position={[0, 1, 0]}>
        <boxGeometry />
      </Item>
      <Item color="blue" position={[width / 6, -height * 1, 0]}>
        <dodecahedronGeometry />
      </Item>
      <Item color="gray" position={[-width / 5, -height * 1.8, -2]}>
        <coneGeometry args={[1, 1, 6]} />
      </Item>
      <Item color="purple" position={[width / 4, -height * 2, 0]}>
        <coneGeometry args={[1.5, 2, 3]} />
      </Item>
      <Item color="black" position={[-width / 12, -height * 2.25, 0.5]}>
        <coneGeometry args={[0.75, 2.5, 12]} />
      </Item>
      <Item color="gray" position={[-width / 812, -height * 3, -2]}>
        <torusKnotGeometry />
      </Item>
      <Item color="orange" position={[-width / 2, -height * 3.25, -2]}>
        <boxGeometry />
      </Item>
      <Item color="red" position={[width / 6, -height * 4, 0]}>
        <coneGeometry args={[1.5, 2, 3]} />
      </Item>
      <Item color="blue" position={[-width / 6, -height * 4.25, -2]}>
        <dodecahedronGeometry />
      </Item>
      <Item color="red" position={[width / 2, -height * 5, -15]}>
        <torusGeometry args={[2, 2, 2]} />
      </Item>
      <Item color="black" position={[-width / 4, -height * 5.5, -2]}>
        <sphereGeometry />
      </Item>

      <Item color="purple" position={[-width / 1.25, -height * 7.5, -15]}>
        <tetrahedronGeometry args={[4, 2, 1.5]} />
      </Item>
      <Item color="cyan" position={[-width / 6, -height * 6.25, -2]}>
        <dodecahedronGeometry />
      </Item>
      <Item color="red" position={[width / 2, -height * 7, -15]}>
        <boxGeometry args={[2, 2, 2]} />
      </Item>
    </>
  )
}

function Item({ color, position, children }) {
  const visible = useRef()
  const ref = useIntersect((isVisible) => (visible.current = isVisible))
  const [xRandomFactor, yRandomFactor] = useMemo(() => [(0.5 - Math.random()) * 0.5, (0.5 - Math.random()) * 0.5], [])

  useFrame(({ clock }, delta) => {
    const elapsedTime = clock.getElapsedTime()

    ref.current.rotation.x = elapsedTime * xRandomFactor
    ref.current.rotation.y = elapsedTime * yRandomFactor

    const scale = THREE.MathUtils.damp(ref.current.scale.x, visible.current ? 1.5 : 0.2, 5, delta)
    ref.current.scale.set(scale, scale, scale)
  })

  return (
    <mesh ref={ref} position={position}>
      {children}
      <meshPhysicalMaterial transparent color={color} />
    </mesh>
  )
}

export { Objects }
