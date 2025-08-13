"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, User, Menu, X, MessageCircle } from 'lucide-react'
import { useCart } from "@/hooks/use-cart"
import { useChatContext } from '../contexts/chat-context'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const { toggleChat } = useChatContext()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-2xl">🥬</div>
          <span className="text-xl font-bold text-green-600">LeekShop</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/shop" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Link href="/account">
            <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
              <User className="h-4 w-4" />
              <span>Account</span>
            </Button>
          </Link>
          <Link href="/cart" className="relative">
            <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-green-600">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 bg-green-50 border-green-200 hover:bg-green-100"
            onClick={toggleChat}
          >
            <MessageCircle className="h-4 w-4 text-green-600" />
            <span className="text-green-600">AI Assistant</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container py-4 space-y-4">
            <Link href="/" className="block text-sm font-medium hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/shop" className="block text-sm font-medium hover:text-green-600 transition-colors">
              Shop
            </Link>
            <Link href="/about" className="block text-sm font-medium hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="block text-sm font-medium hover:text-green-600 transition-colors">
              Contact
            </Link>
            <div className="flex items-center space-x-4 pt-4 border-t">
              <Link href="/account">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </Button>
              </Link>
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                  {itemCount > 0 && <Badge className="ml-2 bg-green-600">{itemCount}</Badge>}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => {
                  toggleChat()
                  setIsMenuOpen(false)
                }}
              >
                <MessageCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-600">AI Assistant</span>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
