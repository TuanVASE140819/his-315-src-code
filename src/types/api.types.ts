// Generic API Response Types
export interface ApiResponse<T = any> {
  data: T
  message?: string
  success?: boolean
  statusCode?: number
}

export interface ApiError {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  data: T[]
  pageNumber: number
  pageSize: number
  totalPages: number
  totalCount: number
}

export interface PaginationParams {
  pageNumber?: number
  pageSize?: number
}

// Request/Response wrapper types
export type ApiRequest<T = any> = T
export type ApiSuccess<T = any> = ApiResponse<T>
export type ApiFailure = ApiError
