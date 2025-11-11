// Category Types
export interface Category {
  id: number
  name: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CreateCategoryPayload {
  name: string
}

export interface UpdateCategoryPayload {
  id: number
  name: string
}

export interface CategorySearchParams {
  keyword?: string
}
