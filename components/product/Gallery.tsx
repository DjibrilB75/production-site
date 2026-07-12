'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-sand-100 shadow-card mb-4">
        <AnimatePresence mode="wait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            key={active}
            src={images[active]}
            alt={`${name} — vue ${active + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setActive(i)}
            className={cn(
              'relative aspect-square rounded-xl overflow-hidden bg-sand-100 border-2 transition-all',
              active === i ? 'border-terracotta-500' : 'border-transparent opacity-70 hover:opacity-100'
            )}
            aria-label={`Voir l'image ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
