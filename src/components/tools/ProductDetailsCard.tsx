"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProductDetailsCard({ product }: { product: any }) {
  const { addItem } = useCart()
  const router = useRouter()

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

  return (
    <div className="rounded-lg p-3">
      <div className="flex items-start gap-3">
        <div className="relative w-20 h-20 rounded-md overflow-hidden bg-muted/30 flex-shrink-0">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill sizes="80px" className="object-contain p-1" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1">
              <div className="font-bold text-gray-900 text-sm mb-1">{product.name}</div>
              <div className="text-xs text-gray-600 mb-2 leading-relaxed">{product.description}</div>
            </div>
            <div className="text-right ml-4">
              <div className="text-lg font-bold text-green-600">${product.price}</div>
              <div className="text-[10px] text-gray-500">ID: {product.id}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              📁 {product.category}
            </span>
            {product.featured && (
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                ⭐ Featured Product
              </span>
            )}
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              product.inStock
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {product.inStock ? '✅ Available' : '❌ Out of Stock'}
            </span>
          </div>

          <div className="mt-2">
            <Button
              size="sm"
              className="h-8 px-3 bg-green-600 hover:bg-green-700"
              disabled={!product.inStock}
              onClick={() => onAddToCart(product)}
            >
              <ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart
            </Button>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="mt-3 pt-3">
              <div className="text-xs text-gray-500 mb-1">Tags:</div>
              <div className="flex gap-1 flex-wrap">
                {product.tags.map((tag: string, tagIndex: number) => (
                  <span key={tagIndex} className="px-2 py-1 bg-muted/50 text-gray-600 rounded text-[10px]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}