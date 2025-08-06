"use client"

import { ProductCard } from "@/components/product-card"

const products = [
  {
    id: 1,
    name: "Classic Spinning Leek",
    price: 29.99,
    image: "/images/spinning-leek.png",
    description: "The original meme leek! Perfect for spinning and bringing joy to your day.",
    category: "Meme Classics",
    size: "hero", // Main featured item
    aspectRatio: "wide", // Landscape oriented
  },
  {
    id: 5,
    name: "Giant Leek (2ft)",
    price: 89.99,
    image: "/images/giant-leek.png",
    description: "For when regular leeks just aren't enough. Maximum spin potential!",
    category: "Premium",
    size: "tall",
    aspectRatio: "portrait", // Person holding tall leek
  },
  {
    id: 4,
    name: "Leek Spin Music Box",
    price: 49.99,
    image: "/images/music-box.png",
    description: "Plays the iconic leek spin song while a tiny leek spins inside!",
    category: "Collectibles",
    size: "square",
    aspectRatio: "square",
  },
  {
    id: 2,
    name: "Premium Organic Leek",
    price: 15.99,
    image: "/images/organic-leek.png",
    description: "Farm-fresh organic leeks for your culinary adventures.",
    category: "Fresh Produce",
    size: "wide",
    aspectRatio: "landscape",
  },
  {
    id: 11,
    name: "Leek Wall Clock",
    price: 34.99,
    image: "/images/leek-clock.png",
    description: "Time flies when you're spinning leeks! Features leek hands that actually spin.",
    category: "Home Decor",
    size: "square",
    aspectRatio: "square",
  },
  {
    id: 3,
    name: "Leek Plushie",
    price: 24.99,
    image: "/images/leek-plushie.png",
    description: "Adorable leek plushie for hugging and spinning (gently).",
    category: "Merchandise",
    size: "compact",
    aspectRatio: "portrait",
  },
  {
    id: 7,
    name: "Leek Spin T-Shirt",
    price: 19.99,
    image: "/images/leek-tshirt.png",
    description: "Wear your leek love proudly! Features the iconic spinning leek design.",
    category: "Apparel",
    size: "compact",
    aspectRatio: "portrait",
  },
  {
    id: 8,
    name: "Leek Phone Case",
    price: 14.99,
    image: "/images/leek-phone-case.png",
    description: "Protect your phone with leek power! Compatible with most smartphones.",
    category: "Tech",
    size: "small",
    aspectRatio: "portrait",
  },
  {
    id: 6,
    name: "Leek Seeds Starter Kit",
    price: 12.99,
    image: "/images/leek-seeds.png",
    description: "Grow your own spinning leeks! Includes seeds, soil, and instructions.",
    category: "Gardening",
    size: "small",
    aspectRatio: "square",
  },
  {
    id: 9,
    name: "Leek Soup Mix",
    price: 8.99,
    image: "/images/leek-soup.png",
    description: "Gourmet leek soup mix for the ultimate comfort food experience.",
    category: "Food",
    size: "small",
    aspectRatio: "portrait",
  },
  {
    id: 10,
    name: "Leek Fidget Spinner",
    price: 16.99,
    image: "/images/leek-fidget.png",
    description: "The perfect fusion of fidget spinner and leek meme. Spin responsibly!",
    category: "Toys",
    size: "small",
    aspectRatio: "square",
  },
  {
    id: 12,
    name: "Golden Leek Trophy",
    price: 199.99,
    image: "/images/golden-leek.png",
    description: "The ultimate leek collector's item! Limited edition golden leek trophy.",
    category: "Premium",
    size: "feature",
    aspectRatio: "square",
  },
]

const getSizeClasses = (size: string, aspectRatio: string) => {
  switch (size) {
    case "hero":
      return "col-span-1 md:col-span-3 lg:col-span-4 row-span-2"
    case "tall":
      return "col-span-1 md:col-span-1 lg:col-span-2 row-span-3 md:row-span-4"
    case "feature":
      return "col-span-1 md:col-span-2 lg:col-span-2 row-span-2"
    case "wide":
      return "col-span-1 md:col-span-2 lg:col-span-3 row-span-1"
    case "square":
      return "col-span-1 md:col-span-1 lg:col-span-2 row-span-2"
    case "compact":
      return "col-span-1 md:col-span-1 lg:col-span-1 row-span-2"
    case "small":
    default:
      return "col-span-1 md:col-span-1 lg:col-span-1 row-span-1"
  }
}

const getAspectRatioClass = (aspectRatio: string) => {
  switch (aspectRatio) {
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

export function BentoProductGrid() {
  return (
    <section className="py-16 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our amazing collection of leeks and leek-related products. From meme classics to fresh produce!
          </p>
        </div>
        
        {/* Optimized Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-min gap-3 md:gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className={`${getSizeClasses(product.size, product.aspectRatio)}`}
            >
              <ProductCard product={product} variant="bento" aspectRatio={product.aspectRatio} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}