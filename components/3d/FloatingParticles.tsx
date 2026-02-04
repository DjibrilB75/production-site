'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FloatingParticlesProps {
  count?: number
  size?: number
  spread?: number
}

export default function FloatingParticles({
  count = 100,
  size = 0.02,
  spread = 20,
}: FloatingParticlesProps) {
  const meshRef = useRef<THREE.Points>(null)

  // Generate particle positions
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const holographicColors = [
      new THREE.Color('#667eea'),
      new THREE.Color('#764ba2'),
      new THREE.Color('#f093fb'),
      new THREE.Color('#4facfe'),
      new THREE.Color('#00f2fe'),
    ]

    for (let i = 0; i < count; i++) {
      // Random positions within a box
      positions[i * 3] = (Math.random() - 0.5) * spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread

      // Random color from holographic palette
      const color = holographicColors[Math.floor(Math.random() * holographicColors.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return [positions, colors]
  }, [count, spread])

  // Animation
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()

    // Slow rotation
    meshRef.current.rotation.y = time * 0.02
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1

    // Update individual particle positions for floating effect
    const positionAttribute = meshRef.current.geometry.getAttribute('position')
    const originalPositions = positions

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Add sinusoidal movement
      const x = originalPositions[i3]
      const y = originalPositions[i3 + 1]
      const z = originalPositions[i3 + 2]

      positionAttribute.setY(
        i,
        y + Math.sin(time * 0.5 + x * 0.5) * 0.1
      )
      positionAttribute.setX(
        i,
        x + Math.cos(time * 0.3 + z * 0.3) * 0.05
      )
    }

    positionAttribute.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
