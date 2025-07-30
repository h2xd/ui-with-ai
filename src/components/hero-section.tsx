import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 text-center bg-gradient-to-b from-green-50 to-background">
      <div className="container max-w-4xl mx-auto">
        <div className="text-6xl mb-6">🥬</div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-green-800">Welcome to LeekShop</h1>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
          The ultimate destination for all your leek needs! From spinning leeks to premium organic varieties, we've got
          you covered.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Shop Now
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            Learn About Leeks
          </Button>
        </div>
        <div className="mt-12 text-sm text-muted-foreground">
          <p>🎵 Leek spin your way to happiness! 🎵</p>
        </div>
      </div>
    </section>
  )
}
