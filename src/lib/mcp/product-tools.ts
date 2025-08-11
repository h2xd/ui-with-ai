import { ProductService } from '../products/product-service'
import { ProductFilter, ProductSearchParams, ProductRecommendationParams } from '../products/types'

export class ProductMCPTools {
  private productService: ProductService

  constructor() {
    this.productService = new ProductService()
  }

  // Tool 1: List all products with optional filtering
  async listProducts(filter?: ProductFilter) {
    const result = await this.productService.getAllProducts(filter)
    if (!result.success) {
      throw new Error(result.error)
    }
    return {
      products: result.data,
      count: result.data?.length || 0,
      message: `Found ${result.data?.length || 0} products`
    }
  }

  // Tool 2: Get product details by ID
  async getProductDetails(productId: number) {
    const result = await this.productService.getProductById(productId)
    if (!result.success) {
      throw new Error(result.error)
    }
    return {
      product: result.data,
      message: `Product details for ${result.data?.name}`
    }
  }

  // Tool 3: Search products
  async searchProducts(query: string, limit?: number, category?: string) {
    const params: ProductSearchParams = { query, limit, category }
    const result = await this.productService.searchProducts(params)
    if (!result.success) {
      throw new Error(result.error)
    }
    return {
      products: result.data,
      count: result.data?.length || 0,
      query,
      message: `Found ${result.data?.length || 0} products matching "${query}"`
    }
  }

  // Tool 4: Filter products by category
  async filterByCategory(category: string) {
    const result = await this.productService.getProductsByCategory(category)
    if (!result.success) {
      throw new Error(result.error)
    }
    return {
      products: result.data,
      count: result.data?.length || 0,
      category,
      message: `Found ${result.data?.length || 0} products in ${category} category`
    }
  }

  // Tool 5: Get products in price range
  async getProductsInPriceRange(minPrice: number, maxPrice: number) {
    const result = await this.productService.getProductsInPriceRange(minPrice, maxPrice)
    if (!result.success) {
      throw new Error(result.error)
    }
    return {
      products: result.data,
      count: result.data?.length || 0,
      priceRange: { minPrice, maxPrice },
      message: `Found ${result.data?.length || 0} products between $${minPrice} and $${maxPrice}`
    }
  }

  // Tool 6: Get product recommendations
  async getRecommendations(params: ProductRecommendationParams) {
    const result = await this.productService.getProductRecommendations(params)
    if (!result.success) {
      throw new Error(result.error)
    }
    return {
      recommendations: result.data,
      count: result.data?.length || 0,
      based_on: params,
      message: `Generated ${result.data?.length || 0} product recommendations`
    }
  }

  // Tool 7: Check product availability
  async checkAvailability(productId: number) {
    const result = await this.productService.checkAvailability(productId)
    return {
      productId: result.productId,
      productName: result.name,
      inStock: result.inStock,
      availability: result.inStock ? 'In Stock' : 'Out of Stock',
      message: `${result.name} is ${result.inStock ? 'available' : 'currently out of stock'}`
    }
  }

  // Tool 8: Get featured products
  async getFeaturedProducts() {
    const result = await this.productService.getFeaturedProducts()
    if (!result.success) {
      throw new Error(result.error)
    }
    return {
      products: result.data,
      count: result.data?.length || 0,
      message: `Found ${result.data?.length || 0} featured products`
    }
  }

  // Bonus: Get all categories
  async getCategories() {
    const categories = await this.productService.getCategories()
    return {
      categories,
      count: categories.length,
      message: `Available categories: ${categories.join(', ')}`
    }
  }
}