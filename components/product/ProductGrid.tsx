'use client'

import { motion } from 'framer-motion'
import { products } from '@/lib/products'
import ProductCard from './ProductCard'

export default function ProductGrid() {
  return (
    <section id="boutique" className="relative py-24 md:py-32 px-6 lg:px-12 bg-dune-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.4em] uppercase text-terracotta-600 mb-4"
          >
            La collection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-night-900 mb-5"
          >
            Trois pièces, trois horizons
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-night-800/60"
          >
            Chaque sac est façonné à la main en cuir pleine fleur, dans une
            palette de couleurs empruntées aux dunes, à l&apos;argile et au
            crépuscule du désert.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
