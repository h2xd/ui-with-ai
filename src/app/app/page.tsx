import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { HeroSection } from "@/components/hero-section"
import { AIAgent } from "@/components/ai-agent"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProductGrid />
      </main>
      <AIAgent />
    </div>
  )
}
