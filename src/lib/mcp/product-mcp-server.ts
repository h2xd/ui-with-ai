import { FunctionTool } from "llamaindex"
import { ProductMCPTools } from './product-tools'
import { z } from 'zod'

export class ProductMCPServer {
  private productTools: ProductMCPTools

  constructor() {
    this.productTools = new ProductMCPTools()
  }

  // Create all MCP tools as LlamaIndex FunctionTools
  createTools(): FunctionTool[] {
    const tools: FunctionTool[] = []

    // Tool 1: List Products
    tools.push(
      FunctionTool.from(
        async ({ category, minPrice, maxPrice, inStock, featured, search }: any) => {
          const filter = { category, minPrice, maxPrice, inStock, featured, search }
          return await this.productTools.listProducts(filter)
        },
        {
          name: "list_products",
          description: "Get all products with optional filtering by category, price range, stock status, featured status, or search term",
          parameters: z.object({
            category: z.string().optional().describe("Filter by product category"),
            minPrice: z.number().optional().describe("Minimum price filter"),
            maxPrice: z.number().optional().describe("Maximum price filter"),
            inStock: z.boolean().optional().describe("Filter by stock availability"),
            featured: z.boolean().optional().describe("Filter by featured status"),
            search: z.string().optional().describe("Search term for products")
          })
        }
      )
    )

    // Tool 2: Get Product Details
    tools.push(
      FunctionTool.from(
        async ({ productId }: { productId: number }) => {
          return await this.productTools.getProductDetails(productId)
        },
        {
          name: "get_product_details",
          description: "Get detailed information about a specific product by its ID",
          parameters: z.object({
            productId: z.number().describe("The ID of the product to retrieve")
          })
        }
      )
    )

    // Tool 3: Search Products
    tools.push(
      FunctionTool.from(
        async ({ query, limit, category }: { query: string; limit?: number; category?: string }) => {
          return await this.productTools.searchProducts(query, limit, category)
        },
        {
          name: "search_products",
          description: "Search products by name, description, or tags",
          parameters: z.object({
            query: z.string().describe("Search query term"),
            limit: z.number().optional().default(10).describe("Maximum number of results to return"),
            category: z.string().optional().describe("Limit search to specific category")
          })
        }
      )
    )

    // Tool 4: Filter by Category
    tools.push(
      FunctionTool.from(
        async ({ category }: { category: string }) => {
          return await this.productTools.filterByCategory(category)
        },
        {
          name: "filter_by_category",
          description: "Get all products in a specific category",
          parameters: z.object({
            category: z.string().describe("Product category to filter by")
          })
        }
      )
    )

    // Tool 5: Get Products in Price Range
    tools.push(
      FunctionTool.from(
        async ({ minPrice, maxPrice }: { minPrice: number; maxPrice: number }) => {
          return await this.productTools.getProductsInPriceRange(minPrice, maxPrice)
        },
        {
          name: "get_products_in_price_range",
          description: "Get products within a specific price range",
          parameters: z.object({
            minPrice: z.number().describe("Minimum price"),
            maxPrice: z.number().describe("Maximum price")
          })
        }
      )
    )

    // Tool 6: Get Product Recommendations
    tools.push(
      FunctionTool.from(
        async ({ productId, category, minPrice, maxPrice, limit }: any) => {
          const params = {
            productId,
            category,
            priceRange: (minPrice && maxPrice) ? [minPrice, maxPrice] as [number, number] : undefined,
            limit
          }
          return await this.productTools.getRecommendations(params)
        },
        {
          name: "get_product_recommendations",
          description: "Get product recommendations based on a product, category, or price range",
          parameters: z.object({
            productId: z.number().optional().describe("Base product ID for similar recommendations"),
            category: z.string().optional().describe("Category for recommendations"),
            minPrice: z.number().optional().describe("Minimum price for recommendations"),
            maxPrice: z.number().optional().describe("Maximum price for recommendations"),
            limit: z.number().optional().default(5).describe("Number of recommendations to return")
          })
        }
      )
    )

    // Tool 7: Check Product Availability
    tools.push(
      FunctionTool.from(
        async ({ productId }: { productId: number }) => {
          return await this.productTools.checkAvailability(productId)
        },
        {
          name: "check_product_availability",
          description: "Check if a product is currently in stock",
          parameters: z.object({
            productId: z.number().describe("The ID of the product to check")
          })
        }
      )
    )

    // Tool 8: Get Featured Products
    tools.push(
      FunctionTool.from(
        async () => {
          return await this.productTools.getFeaturedProducts()
        },
        {
          name: "get_featured_products",
          description: "Get all featured products",
          parameters: z.object({})
        }
      )
    )

    // Bonus Tool: Get Categories
    tools.push(
      FunctionTool.from(
        async () => {
          return await this.productTools.getCategories()
        },
        {
          name: "get_product_categories",
          description: "Get all available product categories",
          parameters: z.object({})
        }
      )
    )

    return tools
  }

  // Get all tools for integration with LlamaIndex chat engine
  getTools(): FunctionTool[] {
    return this.createTools()
  }
}