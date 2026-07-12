'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useCartStore, cartTotal } from '@/lib/store/cart'
import { useMounted } from '@/hooks/useMounted'

const SHIPPING_THRESHOLD = 250
const SHIPPING_FEE = 12

export default function CartPage() {
  const mounted = useMounted()
  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  const subtotal = mounted ? cartTotal(items) : 0
  const shipping = subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  return (
    <main className="min-h-screen bg-dune-50">
      <Navigation />

      <div className="pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl text-night-900 mb-12">Mon panier</h1>

          {!mounted ? null : items.length === 0 ? (
            <div className="text-center py-24">
              <ShoppingBag className="w-12 h-12 text-terracotta-300 mx-auto mb-6" />
              <p className="text-night-800/60 mb-8">Votre panier est vide pour le moment.</p>
              <Link
                href="/#boutique"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-terracotta-600 text-white text-sm tracking-wide uppercase hover:bg-terracotta-700 transition-colors"
              >
                Découvrir la collection
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.colorway}`}
                    className="flex gap-5 p-4 bg-white/60 rounded-2xl shadow-card"
                  >
                    <Link
                      href={`/produit/${item.slug}`}
                      className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-sand-100"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link href={`/produit/${item.slug}`} className="font-display text-xl text-night-900 hover:text-terracotta-700">
                            {item.name}
                          </Link>
                          <p className="text-sm text-night-800/50">Coloris : {item.colorway}</p>
                        </div>
                        <p className="font-medium text-night-900">{(item.price * item.quantity).toFixed(0)} €</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center border border-night-900/15 rounded-full">
                          <button
                            onClick={() => updateQuantity(item.productId, item.colorway, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-sand-100 rounded-full"
                            aria-label="Diminuer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.colorway, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-sand-100 rounded-full"
                            aria-label="Augmenter"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId, item.colorway)}
                          className="text-night-800/40 hover:text-terracotta-600 transition-colors"
                          aria-label="Retirer l'article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white/60 rounded-2xl p-6 shadow-card sticky top-28">
                  <h2 className="font-display text-2xl text-night-900 mb-6">Récapitulatif</h2>
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between text-night-800/70">
                      <span>Sous-total</span>
                      <span>{subtotal.toFixed(0)} €</span>
                    </div>
                    <div className="flex justify-between text-night-800/70">
                      <span>Livraison</span>
                      <span>{shipping === 0 ? 'Offerte' : `${shipping} €`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-terracotta-600">
                        Livraison offerte dès {SHIPPING_THRESHOLD} € d&apos;achat
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-night-900/10 mb-6">
                    <span className="font-medium text-night-900">Total</span>
                    <span className="font-display text-2xl text-night-900">{total.toFixed(0)} €</span>
                  </div>
                  <Link
                    href="/paiement"
                    className="block text-center w-full py-4 rounded-full bg-terracotta-600 text-white font-medium tracking-wide uppercase text-sm hover:bg-terracotta-700 transition-colors"
                  >
                    Passer la commande
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
