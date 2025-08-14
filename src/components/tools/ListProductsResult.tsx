"use client"

import { CompactProductItem } from "@/components/tools/CompactProductItem"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ListProductsResult({ output, shouldAnimate }: { output: any; shouldAnimate: boolean }) {
  if (!output?.products || !Array.isArray(output.products)) return null
  return (
    <div className="space-y-3 rounded-lg p-3 bg-white shadow-md">
      <div className="flex items-center gap-2 text-green-800 font-medium">
        <span className="text-lg">🛒</span>
        <span>{output.message}</span>
      </div>
      <div className="grid gap-1 max-h-96 overflow-y-auto">
        {output.products.slice(0, 8).map((product: any, index: number) => (
          <CompactProductItem key={product.id ?? index} product={product} index={index} shouldAnimate={shouldAnimate} />
        ))}
        {output.products.length > 8 && (
          <div className="text-center py-2 px-3 rounded-lg">
            <span className="text-gray-600 text-sm">... and {output.products.length - 8} more products</span>
            <div className="text-xs text-gray-500 mt-1">Total: {output.products.length} products found</div>
          </div>
        )}
      </div>
    </div>
  )
}