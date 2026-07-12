'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useCartStore, cartTotal } from '@/lib/store/cart'
import { useAuthStore } from '@/lib/store/auth'
import { useOrderStore } from '@/lib/store/orders'
import { useMounted } from '@/hooks/useMounted'

const SHIPPING_THRESHOLD = 250
const SHIPPING_FEE = 12

export default function CheckoutPage() {
  const router = useRouter()
  const mounted = useMounted()
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const currentUser = useAuthStore((s) => s.currentUser)
  const placeOrder = useOrderStore((s) => s.placeOrder)

  const [email, setEmail] = useState('')
  const [shipping, setShipping] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    phone: '',
  })
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' })
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  const subtotal = mounted ? cartTotal(items) : 0
  const shippingFee = subtotal === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = subtotal + shippingFee

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const contactEmail = currentUser?.email || email
    if (!contactEmail) {
      setError('Merci de renseigner votre email.')
      return
    }
    if (card.number.replace(/\s/g, '').length < 12 || !card.expiry || card.cvc.length < 3) {
      setError('Merci de vérifier les informations de votre carte.')
      return
    }

    setProcessing(true)
    setTimeout(() => {
      const order = {
        id: `YU-${Date.now().toString().slice(-8)}`,
        items,
        total,
        shipping,
        email: contactEmail,
        createdAt: new Date().toISOString(),
      }
      placeOrder(order)
      clearCart()
      setProcessing(false)
      router.push(`/confirmation?order=${order.id}`)
    }, 1200)
  }

  if (mounted && items.length === 0) {
    return (
      <main className="min-h-screen bg-dune-50">
        <Navigation />
        <div className="pt-40 pb-24 px-6 text-center">
          <p className="text-night-800/60 mb-8">Votre panier est vide.</p>
          <Link href="/#boutique" className="inline-flex items-center px-7 py-3.5 rounded-full bg-terracotta-600 text-white text-sm tracking-wide uppercase hover:bg-terracotta-700 transition-colors">
            Découvrir la collection
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-dune-50">
      <Navigation />
      <div className="pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl text-night-900 mb-4">Paiement</h1>

          {!currentUser && (
            <p className="text-sm text-night-800/60 mb-10">
              Vous commandez en tant qu&apos;invité.{' '}
              <Link href="/connexion?next=/paiement" className="text-terracotta-700 font-medium hover:underline">
                Connectez-vous
              </Link>{' '}
              ou{' '}
              <Link href="/inscription" className="text-terracotta-700 font-medium hover:underline">
                créez un compte
              </Link>{' '}
              pour retrouver vos commandes.
            </p>
          )}

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white/60 rounded-2xl p-6 shadow-card">
                <h2 className="font-display text-2xl text-night-900 mb-5">Livraison</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {!currentUser && (
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-night-900 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-night-900/15 bg-white focus:border-terracotta-500 outline-none"
                        placeholder="vous@exemple.fr"
                      />
                    </div>
                  )}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-night-900 mb-2">Nom complet</label>
                    <input
                      type="text"
                      required
                      value={shipping.fullName}
                      onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-night-900/15 bg-white focus:border-terracotta-500 outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-night-900 mb-2">Adresse</label>
                    <input
                      type="text"
                      required
                      value={shipping.address}
                      onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-night-900/15 bg-white focus:border-terracotta-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-night-900 mb-2">Ville</label>
                    <input
                      type="text"
                      required
                      value={shipping.city}
                      onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-night-900/15 bg-white focus:border-terracotta-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-night-900 mb-2">Code postal</label>
                    <input
                      type="text"
                      required
                      value={shipping.postalCode}
                      onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-night-900/15 bg-white focus:border-terracotta-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-night-900 mb-2">Pays</label>
                    <input
                      type="text"
                      required
                      value={shipping.country}
                      onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-night-900/15 bg-white focus:border-terracotta-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-night-900 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      required
                      value={shipping.phone}
                      onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-night-900/15 bg-white focus:border-terracotta-500 outline-none"
                    />
                  </div>
                </div>
              </section>

              <section className="bg-white/60 rounded-2xl p-6 shadow-card">
                <h2 className="font-display text-2xl text-night-900 mb-5 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-terracotta-600" /> Paiement
                </h2>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-night-900 mb-2">Numéro de carte</label>
                    <input
                      type="text"
                      required
                      inputMode="numeric"
                      value={card.number}
                      onChange={(e) => setCard({ ...card, number: e.target.value })}
                      placeholder="1234 1234 1234 1234"
                      className="w-full px-4 py-3 rounded-xl border border-night-900/15 bg-white focus:border-terracotta-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-night-900 mb-2">Expiration</label>
                      <input
                        type="text"
                        required
                        value={card.expiry}
                        onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 rounded-xl border border-night-900/15 bg-white focus:border-terracotta-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-night-900 mb-2">CVC</label>
                      <input
                        type="text"
                        required
                        inputMode="numeric"
                        value={card.cvc}
                        onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                        placeholder="123"
                        className="w-full px-4 py-3 rounded-xl border border-night-900/15 bg-white focus:border-terracotta-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-night-800/40 mt-4">
                  Environnement de démonstration — aucune donnée bancaire n&apos;est transmise ou enregistrée.
                </p>
              </section>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white/60 rounded-2xl p-6 shadow-card sticky top-28">
                <h2 className="font-display text-2xl text-night-900 mb-6">Votre commande</h2>
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.colorway}`} className="flex gap-3">
                      <div className="relative w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-sand-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-night-900 truncate">{item.name}</p>
                        <p className="text-xs text-night-800/50">{item.colorway} · Qté {item.quantity}</p>
                      </div>
                      <p className="text-sm text-night-900 shrink-0">{(item.price * item.quantity).toFixed(0)} €</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-sm mb-4 pt-4 border-t border-night-900/10">
                  <div className="flex justify-between text-night-800/70">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(0)} €</span>
                  </div>
                  <div className="flex justify-between text-night-800/70">
                    <span>Livraison</span>
                    <span>{shippingFee === 0 ? 'Offerte' : `${shippingFee} €`}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-night-900/10 mb-6">
                  <span className="font-medium text-night-900">Total</span>
                  <span className="font-display text-2xl text-night-900">{total.toFixed(0)} €</span>
                </div>

                {error && (
                  <p className="text-sm text-terracotta-700 bg-terracotta-50 border border-terracotta-200 rounded-lg px-4 py-3 mb-4">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-4 rounded-full bg-terracotta-600 text-white font-medium tracking-wide uppercase text-sm hover:bg-terracotta-700 transition-colors disabled:opacity-60"
                >
                  {processing ? 'Traitement…' : `Payer ${total.toFixed(0)} €`}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  )
}
