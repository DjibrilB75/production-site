'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Package } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { useAuthStore } from '@/lib/store/auth'
import { useOrderStore } from '@/lib/store/orders'
import { useMounted } from '@/hooks/useMounted'

export default function AccountPage() {
  const mounted = useMounted()
  const router = useRouter()
  const currentUser = useAuthStore((s) => s.currentUser)
  const logout = useAuthStore((s) => s.logout)
  const orders = useOrderStore((s) => s.orders)

  useEffect(() => {
    if (mounted && !currentUser) router.replace('/connexion')
  }, [mounted, currentUser, router])

  if (!mounted || !currentUser) return null

  const myOrders = orders.filter((o) => o.email === currentUser.email).reverse()

  return (
    <main className="min-h-screen bg-dune-50">
      <Navigation />
      <div className="pt-32 pb-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.35em] uppercase text-terracotta-600 mb-3">Mon compte</p>
              <h1 className="font-display text-4xl text-night-900">Bonjour, {currentUser.name.split(' ')[0]}</h1>
              <p className="text-night-800/50 text-sm mt-1">{currentUser.email}</p>
            </div>
            <button
              onClick={() => {
                logout()
                router.push('/')
              }}
              className="inline-flex items-center gap-2 text-sm text-night-800/60 hover:text-terracotta-600 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </div>

          <h2 className="font-display text-2xl text-night-900 mb-6">Mes commandes</h2>
          {myOrders.length === 0 ? (
            <div className="bg-white/60 rounded-2xl p-10 text-center shadow-card">
              <Package className="w-8 h-8 text-terracotta-300 mx-auto mb-4" />
              <p className="text-night-800/60">Vous n&apos;avez pas encore passé de commande.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myOrders.map((order) => (
                <div key={order.id} className="bg-white/60 rounded-2xl p-6 shadow-card">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium text-night-900">Commande #{order.id}</p>
                    <p className="text-sm text-night-800/50">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <p className="text-sm text-night-800/60 mb-2">
                    {order.items.length} article{order.items.length > 1 ? 's' : ''}
                  </p>
                  <p className="font-display text-xl text-night-900">{order.total.toFixed(0)} €</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
