import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-24 px-4 text-center bg-gradient-to-b from-green-50/50 via-white to-white dark:from-emerald-950/20 dark:via-black dark:to-black overflow-hidden">
      {/* Decorative blurred gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(closest-side,white,transparent)]">
        <div className="absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
      </div>

      <div className="container max-w-4xl mx-auto">
        <div className="text-6xl mb-6">🥬</div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-b from-emerald-700 to-emerald-500 dark:from-emerald-300 dark:to-emerald-500 text-transparent bg-clip-text tracking-tight">
          Welcome to LeekShop
        </h1>
        <p className="text-lg md:text-2xl mb-10 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The ultimate destination for all your leek needs! From spinning leeks to premium organic varieties, we&rsquo;ve got
          you covered.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20">
              Shop Now
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="backdrop-blur border-border/60">
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
