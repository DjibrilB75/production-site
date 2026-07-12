'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBox, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { Product } from '@/lib/types'

function ToteModel({ body, strap, accent }: { body: string; strap: string; accent: string }) {
  return (
    <group>
      <RoundedBox args={[1.7, 1.25, 0.55]} radius={0.09} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color={body} roughness={0.75} metalness={0.05} />
      </RoundedBox>
      {[-0.45, 0.45].map((x) => (
        <mesh key={x} position={[x, 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.4, 0.045, 16, 32, Math.PI]} />
          <meshStandardMaterial color={strap} roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[0, 0.62, 0.28]}>
        <boxGeometry args={[1.5, 0.05, 0.02]} />
        <meshStandardMaterial color={accent} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.62, 0.28]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={accent} metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  )
}

function CrossbodyModel({ body, strap, accent }: { body: string; strap: string; accent: string }) {
  return (
    <group>
      <RoundedBox args={[1.15, 1.0, 0.4]} radius={0.07} smoothness={4}>
        <meshStandardMaterial color={body} roughness={0.75} />
      </RoundedBox>
      <RoundedBox args={[1.2, 0.62, 0.44]} radius={0.08} smoothness={4} position={[0, 0.28, 0.01]}>
        <meshStandardMaterial color={accent} roughness={0.65} />
      </RoundedBox>
      <mesh position={[0, -0.02, 0.24]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={body} metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.035, 12, 48, Math.PI]} />
        <meshStandardMaterial color={strap} roughness={0.55} />
      </mesh>
    </group>
  )
}

function BucketModel({ body, strap, accent }: { body: string; strap: string; accent: string }) {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.55, 0.78, 1.2, 32]} />
        <meshStandardMaterial color={body} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.045, 16, 32, Math.PI]} />
        <meshStandardMaterial color={strap} roughness={0.6} />
      </mesh>
      <mesh position={[-0.12, 0.66, 0]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
        <meshStandardMaterial color={accent} />
      </mesh>
      <mesh position={[0.12, 0.62, 0]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
        <meshStandardMaterial color={accent} />
      </mesh>
    </group>
  )
}

function Bag({ product }: { product: Product }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12
  })

  const props = { body: product.bodyColor, strap: product.strapColor, accent: product.accentColor }

  return (
    <group ref={ref} position={[0, -0.1, 0]}>
      {product.bagStyle === 'tote' && <ToteModel {...props} />}
      {product.bagStyle === 'crossbody' && <CrossbodyModel {...props} />}
      {product.bagStyle === 'bucket' && <BucketModel {...props} />}
    </group>
  )
}

export default function ProductViewer3D({ product }: { product: Product }) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0.3, 3.4], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[3, 4, 3]} intensity={1.1} color="#FFE4C4" />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#C2724B" />
        <Suspense fallback={null}>
          <Bag product={product} />
          <ContactShadows position={[0, -0.85, 0]} opacity={0.35} scale={4} blur={2.4} far={2} color="#8C5C48" />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={2.2}
          maxDistance={5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  )
}
