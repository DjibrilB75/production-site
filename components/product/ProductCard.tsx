'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product } from '@/lib/types'

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
    >
      <Link href={`/produit/${product.slug}`} className="group block">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-sand-100 shadow-card mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[1]}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          {product.isNew && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-terracotta-600 text-white text-[11px] tracking-widest uppercase">
              Nouveau
            </span>
          )}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-white/90 text-night-900 text-xs tracking-wide uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Voir le produit
          </span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl text-night-900 group-hover:text-terracotta-700 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-night-800/55">{product.category}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-medium text-night-900">{product.price} €</p>
            {product.compareAtPrice && (
              <p className="text-sm text-night-800/40 line-through">{product.compareAtPrice} €</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-3">
          {product.colorways.map((c) => (
            <span
              key={c.id}
              className="w-3.5 h-3.5 rounded-full border border-night-900/10"
              style={{ backgroundColor: c.hex }}
              title={c.label}
            />
          ))}
        </div>
      </Link>
    </motion.div>
  )
}
