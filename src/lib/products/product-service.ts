import { 
  Product, 
  ProductFilter, 
  ProductSearchParams, 
  ProductRecommendationParams,
  ProductResponse, 
  ProductListResponse 
} from './types'
import { products } from './product-data'

export class ProductService {
  private products: Product[]

  constructor() {
    this.products = products
  }

  // Get all products with optional filtering
  async getAllProducts(filter?: ProductFilter): Promise<ProductListResponse> {
    try {
      let filteredProducts = [...this.products]

      if (filter) {
        if (filter.category) {
          filteredProducts = filteredProducts.filter(p => 
            p.category.toLowerCase() === filter.category?.toLowerCase()
          )
        }

        if (filter.minPrice !== undefined) {
          filteredProducts = filteredProducts.filter(p => p.price >= filter.minPrice!)
        }

        if (filter.maxPrice !== undefined) {
          filteredProducts = filteredProducts.filter(p => p.price <= filter.maxPrice!)
        }

        if (filter.inStock !== undefined) {
          filteredProducts = filteredProducts.filter(p => p.inStock === filter.inStock)
        }

        if (filter.featured !== undefined) {
          filteredProducts = filteredProducts.filter(p => p.featured === filter.featured)
        }

        if (filter.search) {
          const searchTerm = filter.search.toLowerCase()
          filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm) ||
            p.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
          )
        }
      }

      return {
        success: true,
        data: filteredProducts
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Get product by ID
  async getProductById(id: number): Promise<ProductResponse> {
    try {
      const product = this.products.find(p => p.id === id)
      
      if (!product) {
        return {
          success: false,
          error: `Product with ID ${id} not found`
        }
      }

      return {
        success: true,
        data: product
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Search products
  async searchProducts(params: ProductSearchParams): Promise<ProductListResponse> {
    try {
      const { query, limit = 10, category } = params
      const searchTerm = query.toLowerCase()

      let results = this.products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      )

      if (category) {
        results = results.filter(p => p.category.toLowerCase() === category.toLowerCase())
      }

      // Limit results
      results = results.slice(0, limit)

      return {
        success: true,
        data: results
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Get products by category
  async getProductsByCategory(category: string): Promise<ProductListResponse> {
    return this.getAllProducts({ category })
  }

  // Get products in price range
  async getProductsInPriceRange(minPrice: number, maxPrice: number): Promise<ProductListResponse> {
    return this.getAllProducts({ minPrice, maxPrice })
  }

  // Get featured products
  async getFeaturedProducts(): Promise<ProductListResponse> {
    return this.getAllProducts({ featured: true })
  }

  // Get product recommendations
  async getProductRecommendations(params: ProductRecommendationParams): Promise<ProductListResponse> {
    try {
      const { productId, category, priceRange, limit = 5 } = params
      let recommendations: Product[] = []

      if (productId) {
        // Get similar products based on the given product
        const product = this.products.find(p => p.id === productId)
        if (product) {
          recommendations = this.products.filter(p => 
            p.id !== productId && 
            (p.category === product.category || 
             p.tags?.some(tag => product.tags?.includes(tag)))
          )
        }
      } else if (category) {
        // Get products from the same category
        recommendations = this.products.filter(p => p.category.toLowerCase() === category.toLowerCase())
      } else {
        // Default to featured products
        recommendations = this.products.filter(p => p.featured)
      }

      // Apply price range filter if specified
      if (priceRange) {
        recommendations = recommendations.filter(p => 
          p.price >= priceRange[0] && p.price <= priceRange[1]
        )
      }

      // Shuffle and limit results
      recommendations = this.shuffleArray(recommendations).slice(0, limit)

      return {
        success: true,
        data: recommendations
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Get all unique categories
  async getCategories(): Promise<string[]> {
    const categories = [...new Set(this.products.map(p => p.category))]
    return categories.sort()
  }

  // Check product availability
  async checkAvailability(id: number): Promise<{ productId: number; inStock: boolean; name: string }> {
    const product = this.products.find(p => p.id === id)
    return {
      productId: id,
      inStock: product?.inStock ?? false,
      name: product?.name ?? 'Product not found'
    }
  }

  // Utility method to shuffle array
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }
}