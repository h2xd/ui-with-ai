import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProductGrid />
      </main>
    </div>
  )
}
