"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { MessageCircle, Bot, User, Send, Loader2, Settings, CheckCircle, XCircle, Clock, ShoppingCart, Minus, Plus } from 'lucide-react'
import { useChat } from "ai/react"
import { useCart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

// Product result renderer component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProductResultRenderer({ output, toolName }: { output: any; toolName: string }) {
  const { addItem, items, updateQuantity } = useCart()
  const router = useRouter()
  const [hasAnimated, setHasAnimated] = useState(false)
  useEffect(() => {
    if (!hasAnimated) setHasAnimated(true)
  }, [hasAnimated])
  const shouldAnimate = !hasAnimated

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onAddToCart = (p: any) => {
    addItem({ id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1 })
    toast({
      title: "Added to cart!",
      description: `${p.name} has been added to your cart.`,
      action: (
        <ToastAction altText="View cart" onClick={() => router.push("/cart")}>View Cart</ToastAction>
      ),
    })
  }

  const getQuantity = (id: number) => items.find(i => i.id === id)?.quantity ?? 0
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const increment = (p: any) => updateQuantity(p.id, getQuantity(p.id) + 1)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const decrement = (p: any) => updateQuantity(p.id, Math.max(0, getQuantity(p.id) - 1))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CompactProductItem = ({ product, index, shouldAnimate }: { product: any; index: number; shouldAnimate: boolean }) => {
    const qty = getQuantity(product.id)
    return (
    <div
      key={index}
      className={`flex items-center gap-3 bg-white border border-green-200 rounded-lg p-2 hover:shadow-sm transition-all duration-300 ${shouldAnimate ? 'animate-in slide-in-from-left-4 fade-in-0' : ''}`}
      style={shouldAnimate ? { animationDelay: `${index * 100}ms` } : undefined}
    >
      <div className="relative w-14 h-14 rounded-md overflow-hidden bg-muted/30 flex-shrink-0">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill sizes="56px" className="object-contain p-1" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="font-semibold text-sm text-gray-900 truncate">{product.name}</div>
            <div className="mt-1 flex items-center gap-1 flex-wrap">
              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-medium">
                {product.category}
              </span>
              {product.featured && (
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-medium">⭐ Featured</span>
              )}
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
              </span>
            </div>
          </div>

        </div>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-1">
        <div className="text-sm font-bold text-green-600">${product.price}</div>
        {qty > 0 ? (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => decrement(product)}>
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-sm">{qty}</span>
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => increment(product)} disabled={!product.inStock}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            className="h-7 px-2 bg-green-600 hover:bg-green-700"
            disabled={!product.inStock}
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add
          </Button>
        )}
      </div>
    </div>
    )
  }

  // Handle different tool outputs
  if (toolName === 'list_products' && output.products && Array.isArray(output.products)) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-green-800 font-medium">
          <span className="text-lg">🛒</span>
          <span>{output.message}</span>
        </div>
        <div className="grid gap-2 max-h-96 overflow-y-auto">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {output.products.slice(0, 8).map((product: any, index: number) => (
            <CompactProductItem key={product.id ?? index} product={product} index={index} shouldAnimate={shouldAnimate} />
          ))}
          {output.products.length > 8 && (
            <div className="text-center py-2 px-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600 text-sm">... and {output.products.length - 8} more products</span>
              <div className="text-xs text-gray-500 mt-1">Total: {output.products.length} products found</div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (toolName === 'get_product_details' && output.product) {
    const product = output.product
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-green-800 font-medium">
          <span className="text-lg">🔍</span>
          <span>{output.message}</span>
        </div>
        <div className="bg-white border border-green-200 rounded-lg p-3 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="relative w-20 h-20 rounded-md overflow-hidden bg-muted/30 flex-shrink-0">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill sizes="80px" className="object-contain p-1" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-sm mb-1">{product.name}</div>
                  <div className="text-xs text-gray-600 mb-2 leading-relaxed">{product.description}</div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-lg font-bold text-green-600">${product.price}</div>
                  <div className="text-[10px] text-gray-500">ID: {product.id}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  📁 {product.category}
                </span>
                {product.featured && (
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                    ⭐ Featured Product
                  </span>
                )}
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  product.inStock
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.inStock ? '✅ Available' : '❌ Out of Stock'}
                </span>
              </div>

              <div className="mt-3">
                <Button
                  size="sm"
                  className="h-8 px-3 bg-green-600 hover:bg-green-700"
                  disabled={!product.inStock}
                  onClick={() => onAddToCart(product)}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart
                </Button>
              </div>

              {product.tags && product.tags.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Tags:</div>
                  <div className="flex gap-1 flex-wrap">
                    {product.tags.map((tag: string, tagIndex: number) => (
                      <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-[10px]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (toolName === 'search_products' && output.products && Array.isArray(output.products)) {
    return (
      <div className="space-y-3 border border-green-200 rounded-lg p-4 bg-white animate-in slide-in-from-left-4 fade-in-0 duration-300">
        <div className="flex items-center gap-2 text-green-800 font-medium">
          <span className="text-lg">🔎</span>
          <span>{output.message}</span>
          {output.query && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              &ldquo;{output.query}&rdquo;
            </span>
          )}
        </div>
        <div className="grid gap-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {output.products.map((product: any, index: number) => (
            <CompactProductItem key={product.id ?? index} product={product} index={index} shouldAnimate={shouldAnimate} />
          ))}
        </div>
      </div>
    )
  }

  if (toolName === 'get_product_categories' && output.categories) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-green-800 font-medium">
          <span className="text-lg">📁</span>
          <span>{output.message}</span>
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
            {output.categories.length} categories
          </span>
        </div>
        <div className="bg-white border border-green-200 rounded-lg p-3 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            {output.categories.map((category: string, index: number) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors">
                <span className="text-green-600">📂</span>
                <span className="text-sm font-medium text-gray-900">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (toolName === 'check_availability' && output.productName) {
    return (
      <div className="space-y-3 border border-green-200 rounded-lg p-4 bg-white animate-in slide-in-from-left-4 fade-in-0 duration-300">
        <div className="flex items-center gap-2 text-green-800 font-medium">
          <span className="text-lg">📦</span>
          <span>Availability Check</span>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm animate-in slide-in-from-left-4 fade-in-0 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900 text-base">{output.productName}</div>
              <div className="text-sm text-gray-600">Product ID: {output.productId}</div>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                output.inStock
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                <span className="text-lg">
                  {output.inStock ? '✅' : '❌'}
                </span>
                <span>{output.availability}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-sm text-gray-600">{output.message}</div>
          </div>
        </div>
      </div>
    )
  }

  // Handle get_products_in_price_range
  if (toolName === 'get_products_in_price_range' && output.products && Array.isArray(output.products)) {
    return (
      <div className="space-y-3 border border-green-200 rounded-lg p-4 bg-white animate-in slide-in-from-left-4 fade-in-0 duration-300">
        <div className="flex items-center gap-2 text-green-800 font-medium">
          <span className="text-lg">💰</span>
          <span>{output.message}</span>
          {output.priceRange && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              ${output.priceRange.minPrice} - ${output.priceRange.maxPrice}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {output.products.map((product: any, index: number) => (
            <CompactProductItem key={product.id ?? index} product={product} index={index} shouldAnimate={shouldAnimate} />
          ))}
        </div>
      </div>
    )
  }

  // Handle filter_by_category
  if (toolName === 'filter_by_category' && output.products && Array.isArray(output.products)) {
    return (
      <div className="space-y-3 border border-green-200 rounded-lg p-4 bg-white animate-in slide-in-from-left-4 fade-in-0 duration-300">
        <div className="flex items-center gap-2 text-green-800 font-medium">
          <span className="text-lg">🏷️</span>
          <span>{output.message}</span>
          {output.category && (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
              📁 {output.category}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {output.products.map((product: any, index: number) => (
            <CompactProductItem key={product.id ?? index} product={product} index={index} shouldAnimate={shouldAnimate} />
          ))}
        </div>
      </div>
    )
  }

  // Handle get_featured_products
  if (toolName === 'get_featured_products' && output.products && Array.isArray(output.products)) {
    return (
      <div className="space-y-3 border border-green-200 rounded-lg p-4 bg-white animate-in slide-in-from-left-4 fade-in-0 duration-300">
        <div className="flex items-center gap-2 text-green-800 font-medium">
          <span className="text-lg">⭐</span>
          <span>{output.message}</span>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
            {output.products.length} featured items
          </span>
        </div>
        <div className="grid gap-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {output.products.map((product: any, index: number) => (
            <CompactProductItem key={product.id ?? index} product={product} index={index} shouldAnimate={shouldAnimate} />
          ))}
        </div>
      </div>
    )
  }

  // Handle get_recommendations (if this tool exists)
  if (toolName === 'get_recommendations' && output.recommendations && Array.isArray(output.recommendations)) {
    return (
      <div className="space-y-3 border border-green-200 rounded-lg p-4 bg-white animate-in slide-in-from-left-4 fade-in-0 duration-300">
        <div className="flex items-center gap-2 text-green-800 font-medium">
          <span className="text-lg">🎯</span>
          <span>{output.message}</span>
          {output.based_on && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              Based on: {JSON.stringify(output.based_on)}
            </span>
          )}
        </div>
        <div className="grid gap-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {output.recommendations.map((product: any, index: number) => (
            <CompactProductItem key={product.id ?? index} product={product} index={index} shouldAnimate={shouldAnimate} />
          ))}
        </div>
      </div>
    )
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
function ToolInvocationRenderer({ toolInvocation, index }: { toolInvocation: any; index: number }) {

  const toolName = toolInvocation.toolName || 'unknown'
  const state = toolInvocation.state || 'unknown'
  const args = toolInvocation.args || {}
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
        <ProductResultRenderer output={result} toolName={toolName} />
      )}
    </>
  )
}

// Tool annotation component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ToolAnnotation({ part, index }: { part: any; index: number }) {
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
              <ProductResultRenderer output={part.output} toolName={toolName} />
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
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error
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
                        return <ToolAnnotation key={index} part={part} index={index} />
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
                        <ToolInvocationRenderer toolInvocation={toolInvocation} index={index} />
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
