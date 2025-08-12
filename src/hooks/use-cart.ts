"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity"> & { quantity: number }) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

function writeCartCookie(items: CartItem[]) {
  try {
    if (typeof document === 'undefined') return
    const value = encodeURIComponent(JSON.stringify(items))
    // 30 days
    const maxAge = 60 * 60 * 24 * 30
    document.cookie = `cart_items=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax`
  } catch {
    // ignore cookie errors
  }
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            const newItems = state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i))
            writeCartCookie(newItems)
            return { items: newItems }
          }
          const newItems = [...state.items, item]
          writeCartCookie(newItems)
          return { items: newItems }
        }),
      removeItem: (id) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id)
          writeCartCookie(newItems)
          return { items: newItems }
        }),
      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            const newItems = state.items.filter((item) => item.id !== id)
            writeCartCookie(newItems)
            return { items: newItems }
          }
          const newItems = state.items.map((item) => (item.id === id ? { ...item, quantity } : item))
          writeCartCookie(newItems)
          return { items: newItems }
        }),
      clearCart: () => set((state) => {
        const newItems: CartItem[] = []
        writeCartCookie(newItems)
        return { items: newItems }
      }),
      getTotal: () => {
        const state = get()
        return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
