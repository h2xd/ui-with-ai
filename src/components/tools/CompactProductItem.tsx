"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CompactProductItem({ product, index, shouldAnimate }: { product: any; index: number; shouldAnimate: boolean }) {
  const { addItem, items, updateQuantity } = useCart()
  const router = useRouter()

  const getQuantity = (id: number) => items.find(i => i.id === id)?.quantity ?? 0
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const increment = (p: any) => updateQuantity(p.id, getQuantity(p.id) + 1)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decrement = (p: any) => updateQuantity(p.id, Math.max(0, getQuantity(p.id) - 1))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onAddToCart = (p: any) => {
    addItem({ id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1 })
    toast({
      title: "Added to cart!",
      description: `${p.name} has been added to your cart.`,
      action: (
        <ToastAction altText="View cart" onClick={() => router.push("/cart")}>View Cart</ToastAction>
      ),
    })
  }

  const qty = getQuantity(product.id)

  return (
    <div
      className={`flex items-center gap-3 rounded-md p-2 hover:bg-muted/50 transition-all duration-300 ${shouldAnimate ? 'animate-in slide-in-from-left-4 fade-in-0' : ''}`}
      style={shouldAnimate ? { animationDelay: `${index * 100}ms` } : undefined}
    >
      <div className="relative w-14 h-14 rounded-md overflow-hidden bg-muted/30 flex-shrink-0">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill sizes="56px" className="object-contain p-1" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-semibold text-sm text-gray-900 truncate">{product.name}</div>
            <div className="mt-1 flex items-center gap-1 flex-wrap">
              <span className="px-2 py-0.5 bg-muted/50 text-green-700 rounded-full text-[10px] font-medium">
                {product.category}
              </span>
              {product.featured && (
                <span className="px-2 py-0.5 bg-muted/50 text-yellow-700 rounded-full text-[10px] font-medium">⭐ Featured</span>
              )}
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  product.inStock ? 'bg-muted/50 text-green-700' : 'bg-muted/50 text-red-700'
                }`}
              >
                {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-1">
        <div className="text-sm font-bold text-green-600">${product.price}</div>
        {qty > 0 ? (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => decrement(product)}>
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-sm">{qty}</span>
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => increment(product)} disabled={!product.inStock}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            className="h-7 px-2 bg-green-600 hover:bg-green-700"
            disabled={!product.inStock}
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add
          </Button>
        )}
      </div>
    </div>
  )
}