"use client"

import { CompactProductItem } from "@/components/tools/CompactProductItem"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PriceRangeResult({ output, shouldAnimate }: { output: any; shouldAnimate: boolean }) {
  if (!output?.products || !Array.isArray(output.products)) return null
  return (
    <div className="space-y-3 rounded-lg p-3 bg-white shadow-md animate-in slide-in-from-left-4 fade-in-0 duration-300">
      <div className="flex items-center gap-2 text-green-800 font-medium">
        <span className="text-lg">💰</span>
        <span>{output.message}</span>
        {output.priceRange && (
          <span className="px-2 py-1 bg-muted/50 text-blue-700 rounded-full text-xs">
            ${output.priceRange.minPrice} - ${output.priceRange.maxPrice}
          </span>
        )}
      </div>
      <div className="grid gap-1">
        {output.products.map((product: any, index: number) => (
          <CompactProductItem key={product.id ?? index} product={product} index={index} shouldAnimate={shouldAnimate} />
        ))}
      </div>
    </div>
  )
}