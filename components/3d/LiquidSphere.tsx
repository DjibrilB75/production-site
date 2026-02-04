'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

interface LiquidSphereProps {
  position?: [number, number, number]
  scale?: number
  color?: string
  speed?: number
  distort?: number
}

export default function LiquidSphere({
  position = [0, 0, 0],
  scale = 1,
  color = '#667eea',
  speed = 2,
  distort = 0.4,
}: LiquidSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()

    // Gentle floating animation
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
    meshRef.current.rotation.y = time * 0.1
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={scale} position={position}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={distort}
        speed={speed}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </Sphere>
  )
}

// Multiple spheres component
interface LiquidSpheresProps {
  count?: number
}

export function LiquidSpheres({ count = 3 }: LiquidSpheresProps) {
  const spheres = useMemo(() => {
    const configs = [
      { position: [-3, 2, -5] as [number, number, number], scale: 1.5, color: '#667eea', speed: 1.5, distort: 0.3 },
      { position: [4, -1, -8] as [number, number, number], scale: 2, color: '#764ba2', speed: 2, distort: 0.4 },
      { position: [0, 3, -10] as [number, number, number], scale: 2.5, color: '#f093fb', speed: 1, distort: 0.25 },
      { position: [-5, -2, -6] as [number, number, number], scale: 1, color: '#4facfe', speed: 2.5, distort: 0.35 },
      { position: [6, 1, -12] as [number, number, number], scale: 3, color: '#00f2fe', speed: 0.8, distort: 0.2 },
    ]
    return configs.slice(0, count)
  }, [count])

  return (
    <>
      {spheres.map((props, i) => (
        <LiquidSphere key={i} {...props} />
      ))}
    </>
  )
}
