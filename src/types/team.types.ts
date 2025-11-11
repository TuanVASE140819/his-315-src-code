// Team Types
export interface Team {
  id: number
  name: string
  categoryId: number
  categoryName?: string
  logo?: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CreateTeamPayload {
  name: string
  categoryId: number
  files?: any[] // File upload array
}

export interface UpdateTeamPayload {
  id: number
  name: string
  categoryId: number
  files?: any[]
}

export interface TeamSearchParams {
  categoryId?: number
  keyword?: string
}
