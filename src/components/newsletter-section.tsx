"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Gift } from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate subscription
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Welcome to the Leek Family! 🥬",
      description: "You'll receive your 10% discount code via email shortly!",
    })

    setEmail("")
    setIsSubmitting(false)
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
      <div className="container max-w-4xl mx-auto">
        <Card className="bg-white/10 backdrop-blur border-white/20">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Leek Revolution!</h2>
            <p className="text-xl mb-6 text-green-100">
              Get exclusive memes, early access to new products, and a <strong>10% discount</strong> on your first
              order!
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-3 mb-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/20 border-white/30 placeholder:text-green-100 text-white"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-green-600 hover:bg-green-50 px-6"
                >
                  {isSubmitting ? "..." : "Subscribe"}
                </Button>
              </div>
            </form>

            <div className="flex items-center justify-center space-x-6 text-sm text-green-100">
              <div className="flex items-center">
                <Gift className="w-4 h-4 mr-2" />
                10% Off First Order
              </div>
              <div>📧 Weekly Memes</div>
              <div>🚀 Early Access</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
