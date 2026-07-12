import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/lib/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (productId: string, colorway: string) => void
  updateQuantity: (productId: string, colorway: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.colorway === item.colorway
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            }
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (productId, colorway) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.colorway === colorway)
          ),
        })),
      updateQuantity: (productId, colorway, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId && i.colorway === colorway
                ? { ...i, quantity }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    { name: 'yurah-cart' }
  )
)

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0)
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0)
}
