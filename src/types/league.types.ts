// League Types
export interface League {
  id: number
  name: string
  categoryId: number
  categoryName?: string
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CreateLeaguePayload {
  name: string
  categoryId: number
}

export interface UpdateLeaguePayload {
  id: number
  name: string
  categoryId: number
}

export interface LeagueSearchParams {
  categoryId?: number
  keyword?: string
}
