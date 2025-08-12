"use client"

import { CompactProductItem } from "@/components/tools/CompactProductItem"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CartItemsResult({ output }: { output: any }) {
  if (!output) return null
  const items = output.items || []
  const shouldAnimate = false
  return (
    <div className="space-y-3 border border-green-200 rounded-lg p-4 bg-white">
      <div className="flex items-center gap-2 text-green-800 font-medium">
        <span className="text-lg">🛒</span>
        <span>{output.message || `You have ${items.length} items in your cart`}</span>
        <span className="ml-auto text-sm font-semibold text-green-700">Subtotal: ${Number(output.total || 0).toFixed(2)}</span>
      </div>
      {items.length > 0 ? (
        <div className="grid gap-2">
          {items.map((product: any, index: number) => (
            <CompactProductItem key={product.id ?? index} product={product} index={index} shouldAnimate={shouldAnimate} />
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-600">Your cart is empty.</div>
      )}
    </div>
  )
}