"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingCart, AlertTriangle, CheckCircle } from "lucide-react"

interface CheckoutWarningCardProps {
  output: {
    success: false
    isCheckout: true
    message: string
    suggestedAction: string
    route: string
  }
  onNavigationComplete?: () => void
}

export function CheckoutWarningCard({ output, onNavigationComplete }: CheckoutWarningCardProps) {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const [hasNavigated, setHasNavigated] = useState(false)

  const handleNavigation = () => {
    setIsNavigating(true)
    
    // Small delay for animation
    setTimeout(() => {
      router.push(output.route)
      setHasNavigated(true)
      
      // Close chat after navigation
      setTimeout(() => {
        onNavigationComplete?.()
      }, 500)
    }, 800)
  }

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-4 fade-in-0 duration-500">
      <div className="flex items-center gap-2 text-amber-800 font-medium">
        <AlertTriangle className="w-5 h-5 text-amber-600" />
        <span>Checkout Requires Cart Review</span>
      </div>
      
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 shadow-sm">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900 mb-1">Cart Review Required</h3>
              <p className="text-sm text-amber-800 mb-3">{output.message}</p>
              
              <div className="bg-white/70 rounded-lg p-3 border border-amber-200">
                <div className="flex items-center gap-2 text-sm text-amber-700 mb-2">
                  <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full font-medium">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-amber-800">
                  Visit your cart to review items, quantities, and pricing before proceeding to checkout.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              onClick={handleNavigation}
              disabled={isNavigating || hasNavigated}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {isNavigating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Going to Cart...</span>
                </div>
              ) : hasNavigated ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Done!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>{output.suggestedAction}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </div>
        </div>
        
        {isNavigating && (
          <div className="mt-3 flex items-center gap-2 text-sm text-amber-700">
            <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
            <span>Taking you to your cart...</span>
          </div>
        )}
      </div>
    </div>
  )
}