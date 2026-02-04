'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { LiquidSpheres } from './LiquidSphere'
import FloatingParticles from './FloatingParticles'
import { useIsMobile, useReducedMotion } from '@/hooks/useMediaQuery'

function Scene() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />

      {/* Colored directional lights for holographic effect */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#667eea" />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#f093fb" />
      <directionalLight position={[0, -5, 5]} intensity={0.3} color="#4facfe" />

      {/* Point lights for depth */}
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#764ba2" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00f2fe" />

      {/* 3D Elements */}
      <LiquidSpheres count={4} />
      <FloatingParticles count={150} spread={30} size={0.03} />

      <Preload all />
    </>
  )
}

export default function BackgroundScene() {
  const isMobile = useIsMobile()
  const reducedMotion = useReducedMotion()

  // Don't render 3D on mobile or when user prefers reduced motion
  if (isMobile || reducedMotion) {
    return null
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
