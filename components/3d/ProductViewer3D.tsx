'use client'

import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, RoundedBox, ContactShadows, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { Product, PhotoModel } from '@/lib/types'

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

function SatchelModel({ body, strap, accent }: { body: string; strap: string; accent: string }) {
  const geometry = useMemo(() => {
    const topW = 1.05
    const botW = 1.55
    const height = 1.15
    const depth = 0.62
    const shape = new THREE.Shape()
    shape.moveTo(-topW / 2, height / 2)
    shape.lineTo(topW / 2, height / 2)
    shape.lineTo(botW / 2, -height / 2)
    shape.lineTo(-botW / 2, -height / 2)
    shape.closePath()
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 3,
      curveSegments: 1,
    })
    geo.center()
    return geo
  }, [])

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={body} roughness={0.32} metalness={0.15} />
      </mesh>
      {/* front flap */}
      <mesh position={[0, 0.26, 0.34]}>
        <boxGeometry args={[1.0, 0.58, 0.05]} />
        <meshStandardMaterial color={strap} roughness={0.28} metalness={0.15} />
      </mesh>
      {/* twist-lock plate */}
      <mesh position={[0, 0.06, 0.375]}>
        <boxGeometry args={[0.22, 0.12, 0.03]} />
        <meshStandardMaterial color={accent} metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.06, 0.41]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.05, 16]} />
        <meshStandardMaterial color={accent} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* top handle */}
      <mesh position={[0, 0.86, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.32, 0.04, 16, 32, Math.PI]} />
        <meshStandardMaterial color={strap} roughness={0.5} />
      </mesh>
      {/* handle attachment rings */}
      {[-0.34, 0.34].map((x) => (
        <mesh key={x} position={[x, 0.56, 0.1]}>
          <torusGeometry args={[0.05, 0.015, 8, 16]} />
          <meshStandardMaterial color={accent} metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function PhotoPanel({
  url,
  width,
  height,
  position,
  rotationY,
}: {
  url: string
  width: number
  height: number
  position: [number, number, number]
  rotationY: number
}) {
  const texture = useTexture(url)
  texture.colorSpace = THREE.SRGBColorSpace
  return (
    <mesh position={position} rotation={[0, rotationY, 0]}>
      <planeGeometry args={[width, height]} />
      {/* unlit: the photo already carries its own studio lighting, so scene
          lights shouldn't re-shade it (that made off-axis panels go dark) */}
      <meshBasicMaterial map={texture} transparent alphaTest={0.15} side={THREE.DoubleSide} />
    </mesh>
  )
}

function PhotoBillboardBox({ photoModel, body }: { photoModel: PhotoModel; body: string }) {
  const bagHeight = 1.3
  const frontW = bagHeight * photoModel.aspect.front
  const backW = bagHeight * photoModel.aspect.back
  const depth = (bagHeight * photoModel.aspect.left + bagHeight * photoModel.aspect.right) / 2

  return (
    <group>
      {/* dark interior volume so there are no see-through gaps at the seams,
          including behind the open handle loop near the top */}
      <RoundedBox args={[frontW * 0.92, bagHeight * 1.06, depth * 0.9]} radius={0.05} smoothness={2} position={[0, -0.02, 0]}>
        <meshStandardMaterial color={body} roughness={0.6} />
      </RoundedBox>

      <PhotoPanel url={photoModel.front} width={frontW} height={bagHeight} position={[0, 0, depth / 2]} rotationY={0} />
      <PhotoPanel url={photoModel.back} width={backW} height={bagHeight} position={[0, 0, -depth / 2]} rotationY={Math.PI} />
      <PhotoPanel url={photoModel.right} width={depth} height={bagHeight} position={[frontW / 2, 0, 0]} rotationY={Math.PI / 2} />
      <PhotoPanel url={photoModel.left} width={depth} height={bagHeight} position={[-frontW / 2, 0, 0]} rotationY={-Math.PI / 2} />

      {/* top / bottom caps to close the box for free rotation */}
      <mesh position={[0, bagHeight / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[frontW * 0.98, depth * 0.98]} />
        <meshStandardMaterial color={body} roughness={0.6} />
      </mesh>
      <mesh position={[0, -bagHeight / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[frontW * 0.98, depth * 0.98]} />
        <meshStandardMaterial color={body} roughness={0.6} />
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
      {product.photoModel ? (
        <PhotoBillboardBox photoModel={product.photoModel} body={product.bodyColor} />
      ) : (
        <>
          {product.bagStyle === 'tote' && <ToteModel {...props} />}
          {product.bagStyle === 'crossbody' && <CrossbodyModel {...props} />}
          {product.bagStyle === 'bucket' && <BucketModel {...props} />}
          {product.bagStyle === 'satchel' && <SatchelModel {...props} />}
        </>
      )}
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
        <ambientLight intensity={0.9} />
        <directionalLight position={[3, 4, 3]} intensity={1.3} color="#FFE4C4" />
        <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#C2724B" />
        <directionalLight position={[0, 0.6, 4]} intensity={1} color="#FFFFFF" />
        <directionalLight position={[0, 3, -2]} intensity={0.35} color="#FFFFFF" />
        <Suspense fallback={null}>
          <Bag product={product} />
          <ContactShadows position={[0, -0.85, 0]} opacity={0.35} scale={4} blur={2.4} far={2} color="#8C5C48" />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={2.2}
          maxDistance={5}
          minPolarAngle={product.photoModel ? 0.2 : Math.PI / 3}
          maxPolarAngle={product.photoModel ? Math.PI - 0.2 : Math.PI / 1.7}
        />
      </Canvas>
    </div>
  )
}
