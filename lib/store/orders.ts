import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Order } from '@/lib/types'

interface OrderState {
  orders: Order[]
  lastOrderId: string | null
  placeOrder: (order: Order) => void
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      lastOrderId: null,
      placeOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order], lastOrderId: order.id })),
    }),
    { name: 'yurah-orders' }
  )
)
