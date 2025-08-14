"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

interface NavigationCardProps {
  output: {
    success: boolean
    message: string
    route?: string
    pageName?: string
  }
  onNavigationComplete?: () => void
}

export function NavigationCard({ output }: NavigationCardProps) {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const [hasNavigated, setHasNavigated] = useState(false)

  const handleNavigation = () => {
    if (!output.route) return

    setIsNavigating(true)

    // Small delay for animation
    setTimeout(() => {
      router.push(output.route!)
      setHasNavigated(true)

      // Close chat after navigation
      setTimeout(() => {
        setIsNavigating(false)
      }, 500)
    }, 800)
  }

  // No auto-navigation - user must click manually
  useEffect(() => {
    if (output.success && output.route) {
      // Check if we're already on the target page
      const currentPath = window.location.pathname
      const targetPath = output.route

      // Mark as completed if already on target page
      if (currentPath === targetPath) {
        setHasNavigated(true)
      }
    }
  }, [output])

  if (!output.success) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-amber-700 font-medium">
          <span className="text-lg">⚠️</span>
          <span>{output.message}</span>
        </div>
      </div>
    )
  }

  // Check if we're already on the target page
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
  const isAlreadyOnPage = currentPath === output.route

  return (
    <div className="space-y-4 rounded-lg p-3 bg-white shadow-md animate-in slide-in-from-bottom-4 fade-in-0 duration-500">
      <div className="flex items-center gap-2 text-green-800 font-medium">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span>
          {isAlreadyOnPage
            ? `You're already on the ${output.pageName} page! 🎉`
            : output.message
          }
        </span>
      </div>

      <div className="rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-lg">🥬</span>
            </div>
            <div>
              <h3 className="font-semibold text-green-900">
                {isAlreadyOnPage
                  ? `Already on ${output.pageName}`
                  : `Navigate to ${output.pageName}`
                }
              </h3>
              <p className="text-sm text-green-700">
                {isAlreadyOnPage
                  ? "You're all set!"
                  : "Click Go Now to navigate"
                }
              </p>
            </div>
          </div>

          {!isAlreadyOnPage && (
            <Button
              onClick={handleNavigation}
              disabled={isNavigating || hasNavigated}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isNavigating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Going...</span>
                </div>
              ) : hasNavigated ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Done!</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Go Now</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          )}

          {isAlreadyOnPage && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">You&apos;re here!</span>
            </div>
          )}
        </div>

        {isNavigating && (
          <div className="mt-3 flex items-center gap-2 text-sm text-green-700">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span>Navigating to {output.pageName}...</span>
          </div>
        )}

      </div>
    </div>
  )
}