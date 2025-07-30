"use client"

import { ProductCard } from "@/components/product-card"

const products = [
  {
    id: 1,
    name: "Classic Spinning Leek",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "The original meme leek! Perfect for spinning and bringing joy to your day.",
    category: "Meme Classics",
  },
  {
    id: 2,
    name: "Premium Organic Leek",
    price: 15.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Farm-fresh organic leeks for your culinary adventures.",
    category: "Fresh Produce",
  },
  {
    id: 3,
    name: "Leek Plushie",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Adorable leek plushie for hugging and spinning (gently).",
    category: "Merchandise",
  },
  {
    id: 4,
    name: "Leek Spin Music Box",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Plays the iconic leek spin song while a tiny leek spins inside!",
    category: "Collectibles",
  },
  {
    id: 5,
    name: "Giant Leek (2ft)",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "For when regular leeks just aren't enough. Maximum spin potential!",
    category: "Premium",
  },
  {
    id: 6,
    name: "Leek Seeds Starter Kit",
    price: 12.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Grow your own spinning leeks! Includes seeds, soil, and instructions.",
    category: "Gardening",
  },
]

export function ProductGrid() {
  return (
    <section className="py-16 px-4">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our amazing collection of leeks and leek-related products. From meme classics to fresh produce!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
