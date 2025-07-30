import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🥬</span>
          <span className="font-bold text-xl text-green-800">LeekShop</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/shop" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            Cart (0)
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}