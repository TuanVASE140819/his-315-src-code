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
  homeTeamId: number
  awayTeamId: number
  startTime: string
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
}

export interface GameSearchParams {
  leagueId?: number
  keyword?: string
}

export interface UpdateGameResultPayload {
  gameItemId: number
  homeScore: number
  awayScore: number
}
