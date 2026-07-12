'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, Check } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCartStore } from '@/lib/store/cart'
import { cn } from '@/lib/utils'

export default function AddToCart({ product }: { product: Product }) {
  const [colorway, setColorway] = useState(product.colorways[0].id)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const handleAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      colorway: product.colorways.find((c) => c.id === colorway)?.label ?? colorway,
      quantity,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div>
      {product.colorways.length > 1 && (
        <div className="mb-6">
          <p className="text-sm font-medium text-night-900 mb-3">
            Coloris — <span className="text-night-800/60 font-normal">
              {product.colorways.find((c) => c.id === colorway)?.label}
            </span>
          </p>
          <div className="flex items-center gap-3">
            {product.colorways.map((c) => (
              <button
                key={c.id}
                onClick={() => setColorway(c.id)}
                className={cn(
                  'w-9 h-9 rounded-full border-2 transition-all',
                  colorway === c.id ? 'border-terracotta-600 scale-110' : 'border-transparent hover:scale-105'
                )}
                style={{ backgroundColor: c.hex }}
                aria-label={c.label}
                title={c.label}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <p className="text-sm font-medium text-night-900 mb-3">Quantité</p>
        <div className="inline-flex items-center border border-night-900/15 rounded-full">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-sand-100 rounded-full transition-colors"
            aria-label="Diminuer la quantité"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(9, q + 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-sand-100 rounded-full transition-colors"
            aria-label="Augmenter la quantité"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="w-full py-4 rounded-full bg-terracotta-600 text-white font-medium tracking-wide uppercase text-sm hover:bg-terracotta-700 transition-colors shadow-soft mb-3"
      >
        Ajouter au panier — {(product.price * quantity).toFixed(0)} €
      </button>

      <AnimatePresence>
        {added && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-sand-100 text-sm text-night-900 mt-2">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-terracotta-600" />
                Ajouté au panier
              </span>
              <Link href="/panier" className="font-medium text-terracotta-700 hover:underline">
                Voir le panier
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
