import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl">🥬</div>
              <span className="text-xl font-bold text-green-400">LeekShop</span>
            </div>
            <p className="text-gray-400 mb-4">Spreading leek joy and meme culture worldwide, one spin at a time.</p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                📘
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                🐦
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                📸
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                🎵
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=meme" className="hover:text-white transition-colors">
                  Meme Classics
                </Link>
              </li>
              <li>
                <Link href="/shop?category=fresh" className="hover:text-white transition-colors">
                  Fresh Produce
                </Link>
              </li>
              <li>
                <Link href="/shop?category=premium" className="hover:text-white transition-colors">
                  Premium Items
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-white transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-800 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; 2024 LeekShop. All rights reserved. Made with 🥬 and memes.</p>
          <p>🎵 Keep spinning, keep dreaming! 🎵</p>
        </div>
      </div>
    </footer>
  )
}
