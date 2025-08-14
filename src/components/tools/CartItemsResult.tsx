"use client"

import { CompactProductItem } from "@/components/tools/CompactProductItem"

interface CartItem {
  id?: number | string
  name?: string
  price?: number
  image?: string
  quantity?: number
  category?: string
  featured?: boolean
  inStock?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CartItemsResult({ output }: { output: any }) {
  if (!output) return null
  const items: CartItem[] = (output.items || []) as CartItem[]
  const shouldAnimate = false
  return (
    <div className="space-y-3 rounded-lg p-3 bg-white shadow-md">
      <div className="flex items-center gap-2 text-green-800 font-medium">
        <span className="text-lg">🛒</span>
        <span>{output.message || `You have ${items.length} items in your cart`}</span>
        <span className="ml-auto text-sm font-semibold text-green-700">Subtotal: ${Number(output.total || 0).toFixed(2)}</span>
      </div>
      {items.length > 0 ? (
        <div className="grid gap-1">
          {items.map((product: CartItem, index: number) => (
            <CompactProductItem key={product.id ?? index} product={product} index={index} shouldAnimate={shouldAnimate} />
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-600">Your cart is empty.</div>
      )}
    </div>
  )
}