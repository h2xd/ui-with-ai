import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Shop All Leeks</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our complete collection of premium leeks and leek accessories. From meme classics to fresh produce!
          </p>
        </div>
        <ProductGrid />
      </div>
    </div>
  )
}
