import { Header } from "@/components/header"
import { ProductGrid } from "@/components/product-grid"
import { HeroSection } from "@/components/hero-section"
import { FeaturedSection } from "@/components/featured-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedSection />
        <ProductGrid />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
