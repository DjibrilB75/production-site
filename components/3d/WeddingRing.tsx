'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Wedding portfolio photos (Unsplash)
const WEDDING_PHOTOS = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
  'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80',
  'https://images.unsplash.com/photo-1583939411023-14783179e581?w=800&q=80',
]

interface RingSceneProps {
  scrollProgress: React.MutableRefObject<number>
}

function RingScene({ scrollProgress }: RingSceneProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const currentMatRef = useRef<THREE.MeshBasicMaterial>(null!)
  const prevMatRef = useRef<THREE.MeshBasicMaterial>(null!)

  const textures = useTexture(WEDDING_PHOTOS)

  const photoIndex = useRef(0)
  const prevPhotoIndex = useRef(0)
  const crossfade = useRef(1)
  const lastMilestone = useRef(-1)

  // Make textures circular-safe
  textures.forEach((t) => {
    t.wrapS = THREE.ClampToEdgeWrapping
    t.wrapT = THREE.ClampToEdgeWrapping
  })

  useFrame((_, delta) => {
    if (!groupRef.current) return

    const progress = scrollProgress.current
    // 4 full rotations across the full section scroll
    const angle = progress * 4 * Math.PI * 2

    groupRef.current.rotation.y = angle

    // Advance photo every half-rotation (each time ring is face-on)
    const milestone = Math.floor(angle / Math.PI)
    if (milestone !== lastMilestone.current) {
      prevPhotoIndex.current = photoIndex.current
      photoIndex.current = milestone % WEDDING_PHOTOS.length
      lastMilestone.current = milestone
      crossfade.current = 0
    }

    // Smooth crossfade
    crossfade.current = Math.min(1, crossfade.current + delta * 2.5)

    if (currentMatRef.current) {
      currentMatRef.current.map = textures[photoIndex.current]
      currentMatRef.current.opacity = crossfade.current
      currentMatRef.current.needsUpdate = true
    }
    if (prevMatRef.current) {
      prevMatRef.current.map = textures[prevPhotoIndex.current]
      prevMatRef.current.opacity = 1 - crossfade.current
      prevMatRef.current.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef} rotation={[0.18, 0, 0.04]}>
      {/* Main gold band */}
      <mesh castShadow>
        <torusGeometry args={[1.5, 0.13, 64, 256]} />
        <meshPhysicalMaterial
          color={new THREE.Color('#C9A84C')}
          metalness={1}
          roughness={0.04}
          envMapIntensity={2.5}
          reflectivity={1}
        />
      </mesh>

      {/* Inner engraved edge – lighter gold highlight */}
      <mesh>
        <torusGeometry args={[1.37, 0.014, 16, 256]} />
        <meshPhysicalMaterial
          color={new THREE.Color('#FFD166')}
          metalness={1}
          roughness={0.02}
          envMapIntensity={3.5}
        />
      </mesh>

      {/* Outer engraved edge */}
      <mesh>
        <torusGeometry args={[1.63, 0.014, 16, 256]} />
        <meshPhysicalMaterial
          color={new THREE.Color('#FFD166')}
          metalness={1}
          roughness={0.02}
          envMapIntensity={3.5}
        />
      </mesh>

      {/* Previous photo disc (fading out) */}
      <mesh renderOrder={1}>
        <circleGeometry args={[1.35, 128]} />
        <meshBasicMaterial
          ref={prevMatRef}
          map={textures[0]}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Current photo disc (fading in) */}
      <mesh renderOrder={2}>
        <circleGeometry args={[1.35, 128]} />
        <meshBasicMaterial
          ref={currentMatRef}
          map={textures[0]}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Soft gold glow halo */}
      <mesh renderOrder={0}>
        <torusGeometry args={[1.5, 0.55, 16, 128]} />
        <meshBasicMaterial
          color={new THREE.Color('#C9A84C')}
          transparent
          opacity={0.035}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

interface WeddingRingProps {
  scrollProgress: React.MutableRefObject<number>
  className?: string
}

export default function WeddingRing({ scrollProgress, className }: WeddingRingProps) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.3,
      }}
    >
      <Suspense fallback={null}>
        {/* Warm ambient fill */}
        <ambientLight intensity={0.25} color="#FFF5D9" />

        {/* Key light – warm gold */}
        <pointLight position={[4, 4, 4]} intensity={4} color="#FFF5D9" />

        {/* Fill light – cool side */}
        <pointLight position={[-5, 2, 3]} intensity={2} color="#C9A84C" />

        {/* Rim / back light */}
        <pointLight position={[0, -5, -3]} intensity={1.5} color="#8B6914" />

        {/* Studio HDR environment for PBR reflections */}
        <Environment preset="studio" />

        <RingScene scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  )
}
