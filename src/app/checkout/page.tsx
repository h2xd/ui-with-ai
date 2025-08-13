"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { useState, useRef, useEffect } from "react"
import { toast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Form refs for auto-filling
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const zipRef = useRef<HTMLInputElement>(null)
  const cardNumberRef = useRef<HTMLInputElement>(null)
  const expiryRef = useRef<HTMLInputElement>(null)
  const cvvRef = useRef<HTMLInputElement>(null)
  
  // Calculate totals
  const subtotal = getTotal()
  const taxRate = 0.08
  const tax = subtotal * taxRate
  const total = subtotal + tax

  // Function to fill form with data from AI chat
  const fillFormWithData = (formData: any) => {
    console.log('fillFormWithData called with:', formData)
    
    if (formData.shipping) {
      if (firstNameRef.current) {
        firstNameRef.current.value = formData.shipping.firstName
        console.log('Set firstName:', formData.shipping.firstName)
      }
      if (lastNameRef.current) {
        lastNameRef.current.value = formData.shipping.lastName
        console.log('Set lastName:', formData.shipping.lastName)
      }
      if (emailRef.current) {
        emailRef.current.value = formData.shipping.email
        console.log('Set email:', formData.shipping.email)
      }
      if (addressRef.current) {
        addressRef.current.value = formData.shipping.address
        console.log('Set address:', formData.shipping.address)
      }
      if (cityRef.current) {
        cityRef.current.value = formData.shipping.city
        console.log('Set city:', formData.shipping.city)
      }
      if (zipRef.current) {
        zipRef.current.value = formData.shipping.zip
        console.log('Set zip:', formData.shipping.zip)
      }
    }
    
    if (formData.rawPayment) {
      if (cardNumberRef.current) {
        cardNumberRef.current.value = formData.rawPayment.cardNumber
        console.log('Set cardNumber:', formData.rawPayment.cardNumber)
      }
      if (expiryRef.current) {
        expiryRef.current.value = formData.rawPayment.expiry
        console.log('Set expiry:', formData.rawPayment.expiry)
      }
      if (cvvRef.current) {
        cvvRef.current.value = formData.rawPayment.cvv
        console.log('Set cvv:', formData.rawPayment.cvv)
      }
    }
    
    // Show success toast
    toast({
      title: "Form filled successfully! 📝",
      description: "All checkout information has been populated. Please review and submit.",
    })
  }

  // Listen for form fill events from AI chat
  useEffect(() => {
    const handleFormFill = (event: CustomEvent) => {
      fillFormWithData(event.detail)
    }

    // @ts-expect-error - Custom event listener
    window.addEventListener('fillCheckoutForm', handleFormFill)
    
    return () => {
      // @ts-expect-error - Custom event listener
      window.removeEventListener('fillCheckoutForm', handleFormFill)
    }
  }, [])

  // Make the fill function available globally for the AI chat component
  useEffect(() => {
    // @ts-expect-error - Expose function globally for AI component
    window.fillCheckoutForm = fillFormWithData
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Order placed successfully! 🥬",
      description: "Your leeks are on their way! You'll receive a confirmation email shortly.",
    })

    clearCart()
    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" ref={firstNameRef} required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" ref={lastNameRef} required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" ref={emailRef} type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" ref={addressRef} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" ref={cityRef} required />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" ref={zipRef} required />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" ref={cardNumberRef} placeholder="1234 5678 9012 3456" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" ref={expiryRef} placeholder="MM/YY" required />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" ref={cvvRef} placeholder="123" required />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
