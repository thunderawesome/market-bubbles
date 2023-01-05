import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { extend, useFrame } from '@react-three/fiber'
import { ReactThreeFiber } from '@react-three/fiber/dist/declarations/src'

// Extend so the reconciler will learn about it
extend({ MeshLineGeometry, MeshLineMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: ReactThreeFiber.Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>
      meshLineMaterial: ReactThreeFiber.Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>
    }
  }
}

interface LinesProps {
  dash: any
  count: number
  colors?: THREE.Color[]
  radius: number
}

interface FatLineProps {
  dash?: any
  curve: number[] | Float32Array
  width: number
  speed: number
  color: THREE.Color
}

export default function Lines({ ...props }: LinesProps) {
  const { dash, count, colors = ['lightgreen', 'white', 'lightblue'], radius = 10 } = props
  const lines = useMemo(() => {
    return Array.from({ length: count }, () => {
      const pos = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(radius),
        THREE.MathUtils.randFloatSpread(radius),
        THREE.MathUtils.randFloatSpread(radius)
      )
      const points = Array.from({ length: 10 }, () =>
        pos
          .add(
            new THREE.Vector3(
              THREE.MathUtils.randFloatSpread(radius),
              THREE.MathUtils.randFloatSpread(radius),
              THREE.MathUtils.randFloatSpread(radius)
            )
          )
          .clone()
      )
      const curve = new THREE.CatmullRomCurve3(points).getPoints(200)
      const colorId: number = Math.floor(colors.length * Math.random())
      return {
        color: colors[colorId] as THREE.Color,
        width: Math.max(radius / 100, (radius / 50) * Math.random()),
        speed: Math.max(0.025, 0.01 * Math.random()),
        curve: curve.flatMap((point) => point.toArray()),
        dash: dash
      }
    })
  }, [colors, count, radius, dash])
  return (
    <>
      {lines.map((props, index) => (
        <Fatline key={index} {...props} />
      ))}
    </>
  )
}

function Fatline({ ...props }: FatLineProps) {
  const { speed, curve, width, color, dash } = props
  const ref = useRef<any>()
  useFrame((_state, delta) => (ref.current.material.dashOffset -= (delta * speed) / 10))
  return (
    <mesh ref={ref}>
      <meshLineGeometry points={curve} />
      <meshLineMaterial
        transparent
        lineWidth={width}
        color={color}
        depthWrite={false}
        dashArray={0.25}
        dashRatio={dash}
        toneMapped={false}
      />
    </mesh>
  )
}
