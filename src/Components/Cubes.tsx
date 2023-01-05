import { Instances, Instance, Float } from '@react-three/drei'
import * as THREE from 'three'
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useThree, Vector3 } from '@react-three/fiber'
import { LayerMaterial, Depth, Fresnel } from 'lamina/vanilla'
import { Quote } from './Quote'
import { Object3D } from 'three'

const objContainer = new THREE.Object3D()
const colorA = new THREE.Color('#FFA500').convertSRGBToLinear()
const colorB = new THREE.Color('#880000').convertSRGBToLinear()
const fresnel = new THREE.Color('#ffffff').convertSRGBToLinear()
const material = new LayerMaterial({
  layers: [
    new Depth({
      colorA: colorA,
      colorB: colorB,
      alpha: 0.5,
      mode: 'normal',
      near: 0,
      far: 2,
      origin: [1, 1, 1]
    }),
    new Depth({
      colorA: 'orange',
      colorB: colorB,
      alpha: 0.5,
      mode: 'add',
      near: 3,
      far: 2,
      origin: [1, 1, 1]
    }),
    new Fresnel({
      mode: 'add',
      color: fresnel,
      intensity: 1,
      power: 2.5,
      bias: 0.0
    })
  ]
})

interface InstanceProps {
  id: number
}

interface InstancesProps {
  count: number
  objects: Object3D[]
}

interface Props {
  count: number
}

const CubeInstance = React.memo(({ ...props }: InstanceProps) => {
  const { id } = props
  const ref = useRef()
  const { viewport, camera } = useThree()
  const [speed] = useState(() => 1 + Math.random() * 2.5)
  const scale: Vector3 = useMemo(() => {
    const s = Math.random() / 1.5
    return [s, s, s]
  }, [])

  const position: Vector3 = useMemo(() => {
    const z = (Math.random() + 1) * -1
    const bounds = viewport.getCurrentViewport(camera, [0, 0, z])
    return [THREE.MathUtils.randFloatSpread(bounds.width * 0.75), THREE.MathUtils.randFloatSpread(bounds.height * 0.75), z]
  }, [viewport, camera])

  return (
    <group>
      <Float
        position={position}
        scale={scale}
        speed={speed} // Animation speed
        // rotationIntensity={speed}
        floatIntensity={speed} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        dispose={null}>
        <Instance ref={ref}>
          <Quote id={id} symbol={''} />
        </Instance>
      </Float>
    </group>
  )
})

function CubeInstances({ ...props }: InstancesProps) {
  const { count, objects } = props
  return (
    <group>
      <Instances range={count} material={material}>
        <extrudeBufferGeometry />
        {objects.map((_, i) => (
          <CubeInstance key={i} id={i} />
        ))}
      </Instances>
    </group>
  )
}

const Cubes = ({ ...props }: Props) => {
  const { count } = props
  const objects: Object3D[] = useMemo(() => Array.from({ length: count }).map(() => objContainer), [count])
  const [objs, setObjects] = useState<Object3D[]>([])

  useEffect(() => {
    setObjects(objects)
  }, [objects])

  return (
    <group position={[0, 0, 0]}>
      <CubeInstances objects={objs} count={count} />
    </group>
  )
}

export { Cubes }
