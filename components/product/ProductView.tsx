'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Rotate3d, Images } from 'lucide-react'
import { Product } from '@/lib/types'
import { cn } from '@/lib/utils'
import Gallery from './Gallery'
import SpinViewer from './SpinViewer'

const ProductViewer3D = dynamic(() => import('@/components/3d/ProductViewer3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-night-800/40 text-sm">
      Chargement de la vue 3D…
    </div>
  ),
})

export default function ProductView({ product }: { product: Product }) {
  const [mode, setMode] = useState<'gallery' | '3d'>('gallery')
  const hasPhotoModel = Boolean(product.photoModel)

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setMode('gallery')}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors',
            mode === 'gallery' ? 'bg-terracotta-600 text-white' : 'bg-sand-100 text-night-800/70 hover:bg-sand-200'
          )}
        >
          <Images className="w-4 h-4" /> Galerie
        </button>
        <button
          onClick={() => setMode('3d')}
          className={cn(
            'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors',
            mode === '3d' ? 'bg-terracotta-600 text-white' : 'bg-sand-100 text-night-800/70 hover:bg-sand-200'
          )}
        >
          <Rotate3d className="w-4 h-4" /> {hasPhotoModel ? 'Vue 360°' : 'Vue 3D'}
        </button>
      </div>

      {mode === 'gallery' ? (
        <Gallery images={product.images} name={product.name} />
      ) : (
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-sand-100 to-sand-200 shadow-card">
          {hasPhotoModel && product.photoModel ? (
            <SpinViewer photoModel={product.photoModel} name={product.name} />
          ) : (
            <ProductViewer3D product={product} />
          )}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/70 backdrop-blur text-xs text-night-800/70 tracking-wide">
            {hasPhotoModel ? 'Glissez pour faire pivoter' : 'Glissez pour faire pivoter · Molette pour zoomer'}
          </span>
        </div>
      )}
    </div>
  )
}
