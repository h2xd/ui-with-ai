import { ProductService } from '../products/product-service'
import { Product, ProductFilter } from '../products/types'

// Client-side API functions for product management
export class ProductAPI {
  private productService: ProductService

  constructor() {
    this.productService = new ProductService()
  }

  // Get all products with optional filtering
  async getAllProducts(filter?: ProductFilter): Promise<Product[]> {
    const result = await this.productService.getAllProducts(filter)
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch products')
    }
    return result.data || []
  }

  // Get featured products
  async getFeaturedProducts(): Promise<Product[]> {
    const result = await this.productService.getFeaturedProducts()
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch featured products')
    }
    return result.data || []
  }

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    const result = await this.productService.getProductsByCategory(category)
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch products by category')
    }
    return result.data || []
  }

  // Search products
  async searchProducts(query: string, limit?: number): Promise<Product[]> {
    const result = await this.productService.searchProducts({ query, limit })
    if (!result.success) {
      throw new Error(result.error || 'Failed to search products')
    }
    return result.data || []
  }

  // Get product by ID
  async getProductById(id: number): Promise<Product> {
    const result = await this.productService.getProductById(id)
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch product')
    }
    if (!result.data) {
      throw new Error('Product not found')
    }
    return result.data
  }

  // Get all categories
  async getCategories(): Promise<string[]> {
    return await this.productService.getCategories()
  }
}

// Create a singleton instance
export const productAPI = new ProductAPI()