"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, MessageCircle, HelpCircle, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent! 🥬",
      description: "Thanks for reaching out! We'll get back to you within 24 hours.",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-green-50 to-background">
        <div className="container max-w-4xl mx-auto">
          <div className="text-6xl mb-6">📞</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-green-800">Get in Touch</h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto">
            Have questions about leeks? Need help with your order? Want to share your leek memes? We'd love to hear from
            you!
          </p>
        </div>
      </section>

      <div className="container py-16 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible!
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="What can we help you with?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order">Order Support</SelectItem>
                        <SelectItem value="product">Product Question</SelectItem>
                        <SelectItem value="shipping">Shipping Inquiry</SelectItem>
                        <SelectItem value="return">Returns & Exchanges</SelectItem>
                        <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                        <SelectItem value="meme">Meme Submission</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your leek needs, share your memes, or ask us anything!"
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message 🥬"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-muted-foreground">
                      123 Meme Street
                      <br />
                      Internet City, IC 12345
                      <br />
                      Leekland
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) LEEK-SPIN</p>
                    <p className="text-muted-foreground">+1 (555) 533-5774</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">hello@leekshop.com</p>
                    <p className="text-muted-foreground">support@leekshop.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed (Leek rest day)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Quick Help</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">Chat with LeekBot</h4>
                    <p className="text-sm text-muted-foreground">Get instant answers to common questions</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
                  <HelpCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">FAQ</h4>
                    <p className="text-sm text-muted-foreground">Find answers to frequently asked questions</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
                  <ShoppingBag className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">Order Status</h4>
                    <p className="text-sm text-muted-foreground">Track your leek deliveries</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Stay updated with the latest leek memes and product launches!
                </p>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">
                    📘 Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    🐦 Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    📸 Instagram
                  </Button>
                  <Button variant="outline" size="sm">
                    🎵 TikTok
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are your leeks actually spinnable?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our Classic Spinning Leek is designed for optimal spin performance. Results may vary based on spinning
                  technique and meme enthusiasm.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you ship internationally?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! We ship leek joy worldwide. Shipping times vary by location, but we guarantee your leeks will
                  arrive fresh and ready to spin.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I return a leek if it doesn't spin properly?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer a 30-day spin guarantee! If your leek doesn't bring you joy, we'll replace it or provide a
                  full refund.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you accept meme submissions?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We love seeing your leek creations! Send us your memes and you might see them featured on our social
                  media or even inspire new products.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
