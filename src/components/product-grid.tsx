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
  },
  {
    id: 2,
    name: "Premium Organic Leek",
    price: 15.99,
    image: "/images/organic-leek.png",
    description: "Farm-fresh organic leeks for your culinary adventures.",
    category: "Fresh Produce",
  },
  {
    id: 3,
    name: "Leek Plushie",
    price: 24.99,
    image: "/images/leek-plushie.png",
    description: "Adorable leek plushie for hugging and spinning (gently).",
    category: "Merchandise",
  },
  {
    id: 4,
    name: "Leek Spin Music Box",
    price: 49.99,
    image: "/images/music-box.png",
    description: "Plays the iconic leek spin song while a tiny leek spins inside!",
    category: "Collectibles",
  },
  {
    id: 5,
    name: "Giant Leek (2ft)",
    price: 89.99,
    image: "/images/giant-leek.png",
    description: "For when regular leeks just aren't enough. Maximum spin potential!",
    category: "Premium",
  },
  {
    id: 6,
    name: "Leek Seeds Starter Kit",
    price: 12.99,
    image: "/images/leek-seeds.png",
    description: "Grow your own spinning leeks! Includes seeds, soil, and instructions.",
    category: "Gardening",
  },
  {
    id: 7,
    name: "Leek Spin T-Shirt",
    price: 19.99,
    image: "/images/leek-tshirt.png",
    description: "Wear your leek love proudly! Features the iconic spinning leek design.",
    category: "Apparel",
  },
  {
    id: 8,
    name: "Leek Phone Case",
    price: 14.99,
    image: "/images/leek-phone-case.png",
    description: "Protect your phone with leek power! Compatible with most smartphones.",
    category: "Tech",
  },
  {
    id: 9,
    name: "Leek Soup Mix",
    price: 8.99,
    image: "/images/leek-soup.png",
    description: "Gourmet leek soup mix for the ultimate comfort food experience.",
    category: "Food",
  },
  {
    id: 10,
    name: "Leek Fidget Spinner",
    price: 16.99,
    image: "/images/leek-fidget.png",
    description: "The perfect fusion of fidget spinner and leek meme. Spin responsibly!",
    category: "Toys",
  },
  {
    id: 11,
    name: "Leek Wall Clock",
    price: 34.99,
    image: "/images/leek-clock.png",
    description: "Time flies when you're spinning leeks! Features leek hands that actually spin.",
    category: "Home Decor",
  },
  {
    id: 12,
    name: "Leek Keychain Collection",
    price: 9.99,
    image: "/images/leek-keychain.png",
    description: "Miniature spinning leeks for your keys! Set of 3 different designs.",
    category: "Accessories",
  },
  {
    id: 13,
    name: "Leek Cookbook",
    price: 22.99,
    image: "/images/leek-cookbook.png",
    description: "101 ways to cook with leeks! From soup to dessert (yes, really!).",
    category: "Books",
  },
  {
    id: 14,
    name: "Leek Lamp",
    price: 45.99,
    image: "/images/leek-lamp.png",
    description: "Illuminate your room with leek vibes! LED lamp shaped like a glowing leek.",
    category: "Home Decor",
  },
  {
    id: 15,
    name: "Leek Socks (Pair)",
    price: 12.99,
    image: "/images/leek-socks.png",
    description: "Keep your feet cozy with leek-patterned socks. One size fits most!",
    category: "Apparel",
  },
  {
    id: 16,
    name: "Leek Stress Ball",
    price: 7.99,
    image: "/images/leek-stress-ball.png",
    description: "Squeeze away stress with this squishy leek! Perfect for office use.",
    category: "Wellness",
  },
  {
    id: 17,
    name: "Golden Leek Trophy",
    price: 199.99,
    image: "/images/golden-leek.png",
    description: "The ultimate leek collector's item! Limited edition golden leek trophy.",
    category: "Premium",
  },
  {
    id: 18,
    name: "Leek Chia Pet",
    price: 18.99,
    image: "/images/leek-chia.png",
    description: "Watch your leek grow green hair! Classic chia pet in leek shape.",
    category: "Novelty",
  },
  {
    id: 19,
    name: "Leek Halloween Costume",
    price: 39.99,
    image: "/images/leek-costume.png",
    description: "Transform into the ultimate meme! Full-body leek costume perfect for Halloween or conventions.",
    category: "Costumes",
  },
  {
    id: 20,
    name: "Leek Hat",
    price: 24.99,
    image: "/images/leek-hat.png",
    description: "Become one with the leek! Soft plush hat that makes you look like a walking leek.",
    category: "Apparel",
  },
  {
    id: 21,
    name: "Leek Playing Cards",
    price: 13.99,
    image: "/images/leek-cards.png",
    description: "52 cards of pure leek magic! Each card features different leek memes and artwork.",
    category: "Games",
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
