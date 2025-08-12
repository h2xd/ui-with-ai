import { streamText, tool } from "ai"
import { anthropic } from "@ai-sdk/anthropic"
import { z } from "zod"
import { ProductMCPTools } from "@/lib/mcp/product-tools"

// Create ProductMCPTools instance
const productTools = new ProductMCPTools()

// Create native AI SDK tools directly from ProductMCPTools instead of using LlamaIndex FunctionTools

const aiSdkTools = {
  list_products: tool({
    description: "Get all products with optional filtering by category, price range, stock status, featured status, or search term",
    parameters: z.object({
      category: z.string().optional().describe("Filter by product category"),
      minPrice: z.number().optional().describe("Minimum price filter"),
      maxPrice: z.number().optional().describe("Maximum price filter"),
      inStock: z.boolean().optional().describe("Filter by stock availability"),
      featured: z.boolean().optional().describe("Filter by featured status"),
      search: z.string().optional().describe("Search term for products")
    }),
    execute: async ({ category, minPrice, maxPrice, inStock, featured, search }) => {
      const filter = { category, minPrice, maxPrice, inStock, featured, search }
      return await productTools.listProducts(filter)
    }
  }),

  get_product_details: tool({
    description: "Get detailed information about a specific product by its ID",
    parameters: z.object({
      productId: z.number().describe("The ID of the product to retrieve")
    }),
    execute: async ({ productId }) => {
      return await productTools.getProductDetails(productId)
    }
  }),

  search_products: tool({
    description: "Search for products using a search query with optional filters",
    parameters: z.object({
      query: z.string().describe("Search query for products"),
      limit: z.number().optional().describe("Maximum number of results to return"),
      category: z.string().optional().describe("Filter by category")
    }),
    execute: async ({ query, limit, category }) => {
      return await productTools.searchProducts(query, limit, category)
    }
  }),

  get_product_categories: tool({
    description: "Get all available product categories",
    parameters: z.object({}),
    execute: async () => {
      return await productTools.getCategories()
    }
  }),

  filter_by_category: tool({
    description: "Filter products by category",
    parameters: z.object({
      category: z.string().describe("Category to filter by")
    }),
    execute: async ({ category }) => {
      return await productTools.filterByCategory(category)
    }
  }),

  get_products_in_price_range: tool({
    description: "Get products within a specific price range",
    parameters: z.object({
      minPrice: z.number().describe("Minimum price"),
      maxPrice: z.number().describe("Maximum price")
    }),
    execute: async ({ minPrice, maxPrice }) => {
      return await productTools.getProductsInPriceRange(minPrice, maxPrice)
    }
  }),

  get_featured_products: tool({
    description: "Get all featured products",
    parameters: z.object({}),
    execute: async () => {
      return await productTools.getFeaturedProducts()
    }
  }),

  check_availability: tool({
    description: "Check if a specific product is available",
    parameters: z.object({
      productId: z.number().describe("Product ID to check")
    }),
    execute: async ({ productId }) => {
      return await productTools.checkAvailability(productId)
    }
  }),

  list_cart_items: tool({
    description: "List all items currently in the user's cart (client-synced)",
    parameters: z.object({}),
    // We read the cookie via closure on the incoming request by throwing and catching below in POST.
    // Since AI SDK tools don't accept req directly here, we parse from a global accessor set in POST per call.
    // We'll attach a symbol on globalThis with the latest cookie header for this request lifecycle.
    execute: async () => {
      try {
        // @ts-expect-error custom global for passing cookie header
        const cookieHeader: string | undefined = globalThis.__AI_CHAT_COOKIE_HEADER__
        const cookies = cookieHeader || ''
        const match = cookies.split(/;\s*/).find((c: string) => c.startsWith('cart_items='))
        if (!match) {
          return { items: [], count: 0, total: 0, message: 'Your cart is empty' }
        }
        const raw = decodeURIComponent(match.replace('cart_items=', ''))
        const items = JSON.parse(raw || '[]') as Array<{ id: number; name: string; price: number; image: string; quantity: number }>
        const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
        return {
          items,
          count: items.length,
          total,
          message: `You have ${items.length} item${items.length === 1 ? '' : 's'} in your cart (subtotal $${total.toFixed(2)})`
        }
      } catch (e) {
        return { items: [], count: 0, total: 0, message: 'Unable to read cart items' }
      }
    }
  })
}

export async function POST(req: Request) {
  try {
    console.log('=== Chat API Start ===')
    const { messages } = await req.json()
    console.log('Chat API called with messages:', messages?.length || 0, messages)
    console.log('Available tools:', Object.keys(aiSdkTools))
    console.log('API Key configured:', process.env.ANTHROPIC_API_KEY ? 'Yes' : 'No')

    console.log('Creating streamText...')
    // Expose cookie header for tools during this request lifecycle
    // @ts-expect-error attach to globalThis for tool access
    globalThis.__AI_CHAT_COOKIE_HEADER__ = req.headers.get('cookie') || ''
    const result = await streamText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      system: `You are LeekBot, a helpful and enthusiastic AI assistant for LeekShop, a meme-themed online store that sells leeks and leek-related products.

You now have access to real product data through specialized tools! You can:
- Search and list all products with various filters
- Get detailed product information by ID
- Find products by category, price range, or availability
- Provide personalized product recommendations
- Check product availability and stock status
- Help customers find exactly what they're looking for
- Read the user's cart to assist with checkout

Your personality:
- Enthusiastic about leeks and the leek spin meme
- Helpful with product recommendations using real product data
- Knowledgeable about leek varieties, cooking, and gardening
- Playful and fun, but still professional
- Use leek emojis (🥬) occasionally
- Reference the leek spin meme when appropriate

You can help customers with:
- Product recommendations based on real inventory
- Detailed product information and specifications
- Price comparisons and availability checks
- Category browsing and filtering
- Finding products within specific budgets
- Leek cooking tips and recipes
- Gardening advice for growing leeks
- Order assistance with actual products

When customers ask about products, use the available tools to provide accurate, real-time information. Always be helpful and guide customers to find the perfect leek products for their needs!

Keep responses concise and friendly. If asked about products not related to leeks, gently redirect to leek products while being helpful.`,
      messages,
      tools: aiSdkTools,
      toolChoice: 'auto'
    })

    console.log('streamText created successfully')
    console.log('Converting to DataStreamResponse...')

    // Create response with tool support - AI SDK will handle tool parts automatically
    const response = result.toDataStreamResponse({
      getErrorMessage: (error: unknown) => {
        console.error('Stream error:', error)
        return error instanceof Error ? error.message : 'An error occurred during streaming'
      }
    })
    console.log('=== Chat API Success ===')
    return response
  } catch (error) {
    console.error('=== Chat API Error ===')
    console.error('Error details:', error)
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack')
    console.error('Error name:', error instanceof Error ? error.name : 'Unknown name')
    return new Response(JSON.stringify({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
