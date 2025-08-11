"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
  size?: string
  aspectRatio?: string
}

interface ProductCardProps {
  product: Product
  variant?: "default" | "bento"
  aspectRatio?: string
}

export function ProductCard({ product, variant = "default", aspectRatio }: ProductCardProps) {
  const { addItem } = useCart()
  const router = useRouter()

  const getAspectRatioClass = (ratio: string) => {
    switch (ratio) {
      case "landscape":
        return "aspect-[4/3]"
      case "wide":
        return "aspect-[16/9]"
      case "portrait":
        return "aspect-[3/4]"
      case "square":
      default:
        return "aspect-square"
    }
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      action: (
        <ToastAction
          altText="View cart"
          onClick={() => router.push("/cart")}
        >
          View Cart
        </ToastAction>
      ),
    })
  }

  if (variant === "bento") {
    const aspectClass = aspectRatio ? getAspectRatioClass(aspectRatio) : "aspect-square"

    return (
      <Card className="group rounded-xl border border-border/60 bg-card hover:shadow-xl transition-all h-full flex flex-col hover:-translate-y-0.5 hover:ring-1 hover:ring-emerald-200/70">
        <CardContent className="p-0 flex-1">
          <div className={`relative overflow-hidden rounded-t-xl bg-muted/40 ${aspectClass}`}>
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain group-hover:scale-105 transition-transform duration-300 p-2"
            />
                         <Badge className="absolute top-2 left-2 bg-emerald-600/90 backdrop-blur-sm text-xs">{product.category}</Badge>
          </div>
          <div className="p-2 lg:p-3 flex-1 flex flex-col">
            <h3 className="font-semibold text-xs lg:text-sm mb-1 line-clamp-2">{product.name}</h3>
            <p className="text-muted-foreground text-xs mb-2 line-clamp-2 flex-1">{product.description}</p>
            <div className="text-sm lg:text-lg font-bold text-green-600">${product.price}</div>
          </div>
        </CardContent>
        <CardFooter className="p-2 lg:p-3 pt-0">
          <Button onClick={handleAddToCart} size="sm" className="w-full bg-green-600 hover:bg-green-700 text-xs h-8">
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="group rounded-xl border border-border/60 bg-card hover:shadow-xl transition-all hover:-translate-y-0.5 hover:ring-1 hover:ring-emerald-200/70">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-xl bg-muted/40">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className="absolute top-2 left-2 bg-emerald-600/90">{product.category}</Badge>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="text-2xl font-bold text-green-600">${product.price}</div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full bg-green-600 hover:bg-green-700">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
