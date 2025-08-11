export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
  inStock?: boolean
  featured?: boolean
  tags?: string[]
}

export interface ProductFilter {
  category?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  featured?: boolean
  search?: string
}

export interface ProductSearchParams {
  query: string
  limit?: number
  category?: string
}

export interface ProductRecommendationParams {
  productId?: number
  category?: string
  priceRange?: [number, number]
  limit?: number
}

export interface ProductServiceResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export type ProductList = Product[]
export type ProductResponse = ProductServiceResponse<Product>
export type ProductListResponse = ProductServiceResponse<ProductList>