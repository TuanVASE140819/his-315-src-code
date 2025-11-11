// Game Types
export interface Game {
  id: number
  leagueId: number
  leagueName?: string
  homeTeamId: number
  homeTeamName?: string
  awayTeamId: number
  awayTeamName?: string
  startTime: string
  homeScore?: number
  awayScore?: number
  status: GameStatus
  isActive: boolean
  createdAt?: string
  updatedAt?: string
}

export enum GameStatus {
  Scheduled = 'Scheduled',
  InProgress = 'InProgress',
  Finished = 'Finished',
  Cancelled = 'Cancelled',
}

export interface CreateGamePayload {
  leagueId: number
  description?: string
  homeTeamId?: number
  awayTeamId?: number
  startTime: string
  gameItems?: GameItemPayload[]
}

export interface UpdateGamePayload {
  id: number
  leagueId?: number
  homeTeamId?: number
  awayTeamId?: number
  startTime?: string
  homeScore?: number
  awayScore?: number
  status?: GameStatus
  gameItems?: GameItemPayload[]
}

export interface GameSearchParams {
  leagueId?: number
  keyword?: string
}

export interface GameItemPayload {
  id?: number
  name?: string
  imageUrl?: string | null
  odds?: number
  displayOrder?: number
  teamId?: number | null
  isWin?: boolean
}

export interface UpdateGameResultPayload {
  gameItemId?: number
  infoGameItem?: { id: number }
  homeScore?: number
  awayScore?: number
}

// When creating multiple games in one request, the API expects an array of CreateGamePayload
export type CreateGameBatchPayload = CreateGamePayload[]
