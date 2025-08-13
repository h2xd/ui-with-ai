"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { MessageCircle, Bot, User, Send, Loader2 } from 'lucide-react'
import { useChat } from "ai/react"
import { ProductDetailsCard } from "@/components/tools/ProductDetailsCard"
import { ListProductsResult } from "@/components/tools/ListProductsResult"
import { SearchProductsResult } from "@/components/tools/SearchProductsResult"
import { CategoriesResult } from "@/components/tools/CategoriesResult"
import { AvailabilityResult } from "@/components/tools/AvailabilityResult"
import { PriceRangeResult } from "@/components/tools/PriceRangeResult"
import { CategoryFilterResult } from "@/components/tools/CategoryFilterResult"
import { FeaturedProductsResult } from "@/components/tools/FeaturedProductsResult"
import { RecommendationsResult } from "@/components/tools/RecommendationsResult"
import { CartItemsResult } from "@/components/tools/CartItemsResult"
import { NavigationCard } from "@/components/tools/NavigationCard"
import { CheckoutWarningCard } from "@/components/tools/CheckoutWarningCard"
import { CheckoutFormFillCard } from "@/components/tools/CheckoutFormFillCard"

// Product result renderer component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProductResultRenderer({ output, toolName, onNavigationComplete }: { output: any; toolName: string; onNavigationComplete?: () => void }) {
  const [hasAnimated, setHasAnimated] = useState(false)
  useEffect(() => {
    if (!hasAnimated) setHasAnimated(true)
  }, [hasAnimated])
  const shouldAnimate = !hasAnimated

  if (toolName === 'list_products' && output.products && Array.isArray(output.products)) {
    return <ListProductsResult output={output} shouldAnimate={shouldAnimate} />
  }

  if (toolName === 'get_product_details' && output.product) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-green-800 font-medium">
          <span className="text-lg">🔍</span>
          <span>{output.message}</span>
        </div>
        <ProductDetailsCard product={output.product} />
      </div>
    )
  }

  if (toolName === 'search_products' && output.products && Array.isArray(output.products)) {
    return <SearchProductsResult output={output} shouldAnimate={shouldAnimate} />
  }

  if (toolName === 'get_product_categories' && output.categories) {
    return <CategoriesResult output={output} />
  }

  if (toolName === 'check_availability' && output.productName) {
    return <AvailabilityResult output={output} />
  }

  if (toolName === 'get_products_in_price_range' && output.products && Array.isArray(output.products)) {
    return <PriceRangeResult output={output} shouldAnimate={shouldAnimate} />
  }

  if (toolName === 'filter_by_category' && output.products && Array.isArray(output.products)) {
    return <CategoryFilterResult output={output} shouldAnimate={shouldAnimate} />
  }

  if (toolName === 'get_featured_products' && output.products && Array.isArray(output.products)) {
    return <FeaturedProductsResult output={output} shouldAnimate={shouldAnimate} />
  }

  if (toolName === 'get_recommendations' && output.recommendations && Array.isArray(output.recommendations)) {
    return <RecommendationsResult output={output} shouldAnimate={shouldAnimate} />
  }

  if (toolName === 'list_cart_items') {
    return <CartItemsResult output={output} />
  }

  if (toolName === 'navigate_to_page') {
    if (output.isCheckout) {
      return <CheckoutWarningCard output={output} onNavigationComplete={onNavigationComplete} />
    }
    return <NavigationCard output={output} onNavigationComplete={onNavigationComplete} />
  }

  if (toolName === 'fill_checkout_form') {
    const handleFillForm = (formData: any) => {
      console.log('handleFillForm called with:', formData)
      // Call the global function exposed by the checkout page
      if (typeof window !== 'undefined' && (window as any).fillCheckoutForm) {
        console.log('Calling window.fillCheckoutForm with:', formData)
        ;(window as any).fillCheckoutForm(formData)
      } else {
        console.log('window.fillCheckoutForm not found')
      }
    }
    
    return <CheckoutFormFillCard output={output} onFillForm={handleFillForm} />
  }

  // Fallback for other tool types or unrecognized output
  return (
    <div className="space-y-2">
      {output.message && (
        <div className="flex items-center gap-2 text-green-800 font-medium">
          <span className="text-lg">🛠️</span>
          <span>{output.message}</span>
        </div>
      )}
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
        <pre className="text-xs overflow-auto max-h-32 text-gray-600">
          {JSON.stringify(output, null, 2)}
        </pre>
      </div>
    </div>
  )
}

// Tool invocation renderer for AI SDK v4
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ToolInvocationRenderer({ toolInvocation, onNavigationComplete }: { toolInvocation: any; index: number; onNavigationComplete?: () => void }) {

  const toolName = toolInvocation.toolName || 'unknown'
  const result = toolInvocation.result

  const getToolDisplayName = (toolName: string) => {
    const displayNames: Record<string, string> = {
      'list_products': 'Products',
      'get_product_details': 'Product Details',
      'search_products': 'Product Search',
      'get_product_categories': 'Categories',
      'filter_products': 'Filtered Products',
      'get_products_in_price_range': 'Products in Price Range',
      'get_featured_products': 'Featured Products',
      'get_recommendations': 'Recommendations'
    }
    return displayNames[toolName] || toolName
  }

  return (
    <>
      {/* <div>
<div className="flex items-center gap-2 text-sm font-medium text-blue-700 mb-2">
        <Settings className="w-3 h-3" />
        <span>{getToolDisplayName(toolName)}</span>
        <span className="text-xs text-gray-500">({state})</span>
      </div>

      {Object.keys(args).length > 0 && (
        <div className="mb-2">
          <div className="text-xs text-gray-600 mb-1">Parameters:</div>
          <div className="text-xs bg-gray-100 p-2 rounded font-mono">
            {JSON.stringify(args, null, 2)}
          </div>
        </div>
      )}
      </div> */}


      {/* Show result if available */}
      {result && (
        <ProductResultRenderer output={result} toolName={toolName} onNavigationComplete={onNavigationComplete} />
      )}
    </>
  )
}

// Tool annotation component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ToolAnnotation({ part, index, onNavigationComplete }: { part: any; index: number; onNavigationComplete?: () => void }) {
  // Early return if part is undefined or null
  if (!part) {
    return null
  }
  const getToolDisplayName = (toolName: string) => {
    const displayNames: Record<string, string> = {
      'list_products': 'List Products',
      'get_product_details': 'Get Product Details',
      'search_products': 'Search Products',
      'get_product_categories': 'Get Categories',
      'filter_products': 'Filter Products'
    }
    return displayNames[toolName] || toolName
  }

  const getStateMessage = (state: string, toolName: string) => {
    switch (state) {
      case 'input-streaming':
        return `Preparing ${getToolDisplayName(toolName)} request...`
      case 'input-available':
        return `Executing ${getToolDisplayName(toolName)}...`
      case 'output-available':
        return `${getToolDisplayName(toolName)} completed`
      case 'output-error':
        return `${getToolDisplayName(toolName)} failed`
      default:
        return `${getToolDisplayName(toolName)}`
    }
  }

  // Extract tool name from the part type (e.g., "tool-list_products" -> "list_products")
  let toolName = ''
  if (part && part.type && part.type.startsWith('tool-')) {
    toolName = part.type.replace('tool-', '')
  } else if (part && part.toolName) {
    toolName = part.toolName
  } else {
    toolName = 'unknown'
  }

  if (!part.state) {
    return null
  }

  return (
    <div className="my-2 p-3 rounded-2xl bg-white/80 backdrop-blur border border-blue-200/60 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-medium text-blue-700 mb-2">
        <span>🛠️ {getStateMessage(part.state || 'unknown', toolName)}</span>
      </div>

      {/* Show tool inputs when available */}
      {((part.state === 'input-available' || part.state === 'output-available') && part.input) && (
        <div className="mb-2">
          <div className="text-xs text-gray-600 mb-1">Parameters:</div>
          <div className="text-xs bg-gray-100 p-2 rounded font-mono">
            {JSON.stringify(part.input, null, 2)}
          </div>
        </div>
      )}

      {/* Show streaming inputs */}
      {part.state === 'input-streaming' && part.input && (
        <div className="mb-2">
          <div className="text-xs text-gray-600 mb-1">Parameters (streaming):</div>
          <div className="text-xs bg-gray-100 p-2 rounded font-mono">
            {JSON.stringify(part.input, null, 2)}
          </div>
        </div>
      )}

      {/* Show results when available */}
      {part.state === 'output-available' && part.output && (
        <div>
          <div className="text-xs text-green-700 mb-1">Result:</div>
          <div className="text-xs bg-green-50 p-2 rounded border border-green-200">
            {typeof part.output === 'string' ? (
              part.output
            ) : typeof part.output === 'object' && part.output !== null ? (
              <ProductResultRenderer output={part.output} toolName={toolName} onNavigationComplete={onNavigationComplete} />
            ) : (
              String(part.output)
            )}
          </div>
        </div>
      )}

      {/* Show errors */}
      {part.state === 'output-error' && (
        <div>
          <div className="text-xs text-red-700 mb-1">Error:</div>
          <div className="text-xs bg-red-50 p-2 rounded border border-red-200 text-red-700">
            {part.errorText || 'Unknown error occurred'}
          </div>
        </div>
      )}
    </div>
  )
}

export function AIAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('')
  const [hasShownCheckoutMessage, setHasShownCheckoutMessage] = useState(false)

  const handleNavigationComplete = () => {
    setIsOpen(false)
  }
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    append
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: "Hi! I'm Leeki 🥬 How can I help you with your leek shopping today? I can help you find the perfect leek, answer questions about our products, or just chat about the wonderful world of leeks!",
      },
    ],
    onToolCall: (toolCall) => {
      console.log('Tool call:', toolCall)
    },
    onError: (error) => {
      console.error('Chat error:', error)
    }
  })

  // Detect current page and show checkout message when appropriate
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname
      setCurrentPage(pathname)
      
      // If user opens chat on checkout page and hasn't seen the message yet
      if (pathname === '/checkout' && isOpen && !hasShownCheckoutMessage) {
        setHasShownCheckoutMessage(true)
        
        // Add helpful message about checkout form filling
        setTimeout(() => {
          append({
            role: 'assistant',
            content: '💡 I can help you fill out this checkout form quickly! Just ask me to "fill my checkout information" and I\'ll gather all the details for you.'
          })
        }, 1000)
      }
      
      // Reset message flag when leaving checkout page
      if (pathname !== '/checkout') {
        setHasShownCheckoutMessage(false)
      }
    }
  }, [isOpen, hasShownCheckoutMessage, append])

  // Reset checkout message when chat is closed
  useEffect(() => {
    if (!isOpen) {
      setHasShownCheckoutMessage(false)
    }
  }, [isOpen])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          data-ai-toggle
          className="fixed bottom-4 right-4 z-50 rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>

              <SheetContent side="right" className="md:w-[600px] sm:max-w-full p-0 border-none flex flex-col rounded-l-2xl overflow-hidden border-l border-border/60 backdrop-blur-xl shadow-2xl">
        <SheetHeader className="relative p-6">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700" />
          <div aria-hidden className="absolute -top-16 right-0 h-40 w-40 rounded-full blur-2xl" />
          <SheetTitle className="text-xl flex items-center text-white">
            🤖 🥬 Leeki
          </SheetTitle>
          <p className="text-emerald-100/90 text-sm">Your friendly leek shopping companion</p>
        </SheetHeader>

        {/* Custom Chat Interface */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-transparent via-white/40 to-transparent">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-emerald-600 shadow ring-2 ring-white/70 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] ${
                      message.role === 'user'
                        ? 'ml-auto'
                        : ''
                    }`}
                  >
                    {/* Render message parts */}
                    {message.parts?.map((part, index) => {
                      try {

                        // Text content
                        if (part.type === 'text') {
                        return (
                          <div
                            key={index}
                            className={`p-3 rounded-2xl shadow-sm animate-in slide-in-from-bottom-4 fade-in-0 duration-300 ${
                              message.role === 'user'
                                ? 'bg-emerald-600 text-white rounded-br-sm'
                                : 'bg-white/80 backdrop-blur border border-border/60 text-gray-900 rounded-bl-sm'
                            }`}
                          >
                            <div className="whitespace-pre-wrap text-sm">
                              {part.text}
                            </div>
                          </div>
                        )
                      }

                      // Tool annotations - handle all tool types
                      if (part && part.type && part.type.startsWith('tool-')) {
                        return <ToolAnnotation key={index} part={part} index={index} onNavigationComplete={handleNavigationComplete} />
                      }

                      return null
                      } catch (error) {
                        console.error('Error rendering message part:', error, part)
                        return <div key={index} className="text-red-500 text-xs">Error rendering part</div>
                      }
                                        })}

                    {/* Handle AI SDK v4 toolInvocations separately */}
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(message as any).toolInvocations?.map((toolInvocation: any, index: number) => (
                      <div key={`tool-${index}`} className="my-2">
                        <ToolInvocationRenderer toolInvocation={toolInvocation} index={index} onNavigationComplete={handleNavigationComplete} />
                      </div>
                    ))}

                    {/* Fallback for legacy content property */}
                    {(!message.parts || message.parts.length === 0) && message.content && (
                      <div
                        className={`p-3 rounded-2xl shadow-sm animate-in slide-in-from-bottom-4 fade-in-0 duration-300 ${
                          message.role === 'user'
                            ? 'bg-emerald-600 text-white rounded-br-sm'
                            : 'bg-white/80 backdrop-blur border border-border/60 text-gray-900 rounded-bl-sm'
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm">
                          {message.content}
                        </div>
                      </div>
                    )}
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-zinc-800 shadow ring-2 ring-white/70 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}

                             {isLoading && (
                 <div className="flex items-start gap-3 animate-in slide-in-from-bottom-4 fade-in-0 duration-300">
                   <div className="w-8 h-8 rounded-full bg-emerald-600 shadow ring-2 ring-white/70 flex items-center justify-center flex-shrink-0">
                     <Bot className="w-4 h-4 text-white" />
                   </div>
                   <div className="bg-white/80 backdrop-blur border border-border/60 p-3 rounded-2xl shadow-sm">
                     <div className="flex items-center gap-2 text-sm text-gray-700">
                       <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                       Leeki is thinking...
                     </div>
                   </div>
                 </div>
               )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />

              {error && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-red-100 border border-red-200 p-3 rounded-lg">
                    <div className="text-sm text-red-800">
                      Error: {error.message}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
                     <div className="p-4 border-t border-border/60 bg-white/80 dark:bg-neutral-900/70 backdrop-blur">
            <form onSubmit={handleSubmit} className="flex gap-2">
                             <Input
                 value={input}
                 onChange={handleInputChange}
                 placeholder="Type a message..."
                 disabled={isLoading}
                 className="flex-1 rounded-xl border-border/60 bg-white/70 dark:bg-neutral-800/60 backdrop-blur placeholder:text-muted-foreground/70"
                 autoFocus
               />
                             <Button
                 type="submit"
                 disabled={isLoading || !input.trim()}
                 size="icon"
                 className="bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg shadow-emerald-600/20"
               >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
