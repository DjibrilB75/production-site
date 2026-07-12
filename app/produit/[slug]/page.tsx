import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Truck, RotateCcw, ShieldCheck } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ProductView from '@/components/product/ProductView'
import AddToCart from '@/components/product/AddToCart'
import ProductCard from '@/components/product/ProductCard'
import { products, getProductBySlug } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: `${product.name} | Yurah`,
    description: product.shortDescription,
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const related = products.filter((p) => p.slug !== product.slug)

  return (
    <main className="min-h-screen bg-dune-50">
      <Navigation />

      <div className="pt-28 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/#boutique"
            className="inline-flex items-center gap-1.5 text-sm text-night-800/60 hover:text-terracotta-600 transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" /> Retour à la boutique
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">
            <ProductView product={product} />

            <div>
              <p className="text-xs tracking-[0.35em] uppercase text-terracotta-600 mb-3">
                {product.category}
              </p>
              <h1 className="font-display text-4xl md:text-5xl text-night-900 mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-medium text-night-900">{product.price} €</span>
                {product.compareAtPrice && (
                  <span className="text-lg text-night-800/40 line-through">
                    {product.compareAtPrice} €
                  </span>
                )}
              </div>
              <p className="text-night-800/70 leading-relaxed mb-8">{product.description}</p>

              <AddToCart product={product} />

              <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-night-900/10">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="w-5 h-5 text-terracotta-600" />
                  <span className="text-xs text-night-800/60">Livraison 48h</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <RotateCcw className="w-5 h-5 text-terracotta-600" />
                  <span className="text-xs text-night-800/60">Retours 30 jours</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-terracotta-600" />
                  <span className="text-xs text-night-800/60">Paiement sécurisé</span>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-night-900/10">
                <h2 className="font-display text-xl text-night-900 mb-4">Détails</h2>
                <ul className="space-y-2.5">
                  {product.details.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-night-800/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 mt-1.5 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                  <div>
                    <p className="text-night-800/50">Matière</p>
                    <p className="text-night-900">{product.material}</p>
                  </div>
                  <div>
                    <p className="text-night-800/50">Dimensions</p>
                    <p className="text-night-900">{product.dimensions}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24">
            <h2 className="font-display text-3xl text-night-900 mb-10">Vous aimerez aussi</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
