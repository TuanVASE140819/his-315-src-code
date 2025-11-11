import { NavigateFunction } from 'react-router-dom'
import {
  User,
  LoginCredentials,
  ChangePasswordPayload,
  Company,
  Department,
} from './user.types'
import {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from './category.types'
import { Team, CreateTeamPayload, UpdateTeamPayload } from './team.types'
import {
  League,
  CreateLeaguePayload,
  UpdateLeaguePayload,
} from './league.types'
import {
  Game,
  CreateGamePayload,
  UpdateGamePayload,
  UpdateGameResultPayload,
} from './game.types'
import { TransactionTypeOption } from './customer.types'

// ============ STATE TYPES ============

export interface UserState {
  infoUser: User | null
  companies: Company[]
  departments: Department[]
}

export interface CommonState {
  isLoadingScreen: boolean
  listCategory: Category[]
  listTeam: Team[]
  listTransactionType: TransactionTypeOption[]
}

export interface RootState {
  User: UserState
  Common: CommonState
}

// ============ ACTION TYPES ============

// User Actions
export interface LoginAction {
  type: string
  payload: LoginCredentials
  navigate: NavigateFunction
  action?: any
}

export interface LogoutAction {
  type: string
  navigate: NavigateFunction
}

export interface LogoutErrorAction {
  type: string
  error: any
}

export interface UpdateInfoUserAction {
  type: string
}

export interface ChangePasswordAction {
  type: string
  payload: ChangePasswordPayload
  handleReload?: () => void
}

export interface DispatchUserInfoAction {
  type: string
  payload: User
}

// Common Actions
export interface LoadingScreenAction {
  type: string
  payload: boolean
}

export interface ResetStoreAction {
  type: string
}

export interface GetListCategoryAction {
  type: string
}

export interface DispatchListCategoryAction {
  type: string
  payload: Category[]
}

export interface GetListTeamAction {
  type: string
  categoryId?: number | string
}

export interface DispatchListTeamAction {
  type: string
  payload: Team[]
}

export interface GetListTransactionTypeAction {
  type: string
}

export interface DispatchListTransactionTypeAction {
  type: string
  payload: TransactionTypeOption[]
}

// Category Actions
export interface PostCategoryAction {
  type: string
  payload: CreateCategoryPayload
  handleReload?: () => void
}

export interface PutCategoryAction {
  type: string
  payload: UpdateCategoryPayload
  handleReload?: () => void
}

export interface ToggleActiveCategoryAction {
  type: string
  payload: { id: number }
  onLoadCategory?: () => void
}

// Team Actions
export interface PostTeamAction {
  type: string
  payload: CreateTeamPayload
  handleReload?: () => void
}

export interface PutTeamAction {
  type: string
  payload: UpdateTeamPayload
  handleReload?: () => void
}

export interface ToggleActiveTeamAction {
  type: string
  payload: { id: number }
  onLoadTeam?: () => void
}

// League Actions
export interface PostLeagueAction {
  type: string
  payload: CreateLeaguePayload
  handleReload?: () => void
}

export interface PutLeagueAction {
  type: string
  payload: UpdateLeaguePayload
  handleReload?: () => void
}

export interface ToggleActiveLeagueAction {
  type: string
  payload: { id: number }
  onLoadLeague?: () => void
}

// Game Actions
export interface PostGameAction {
  type: string
  payload: CreateGamePayload
  handleReloadAddGame?: () => void
}

export interface PutGameAction {
  type: string
  payload: UpdateGamePayload
  handleCloseEditGame?: () => void
}

export interface ToggleActiveGameAction {
  type: string
  payload: { id: number }
  onLoadGame?: () => void
}

export interface UpdateGameResultAction {
  type: string
  payload: UpdateGameResultPayload
  onLoadGame?: () => void
}

// Customer Actions
export interface ToggleActiveCustomerAction {
  type: string
  payload: { id: number }
  onLoad?: () => void
}

// Union type for all actions
export type UserActionTypes =
  | LoginAction
  | LogoutAction
  | LogoutErrorAction
  | UpdateInfoUserAction
  | ChangePasswordAction
  | DispatchUserInfoAction
  | ResetStoreAction

export type CommonActionTypes =
  | LoadingScreenAction
  | ResetStoreAction
  | GetListCategoryAction
  | DispatchListCategoryAction
  | GetListTeamAction
  | DispatchListTeamAction
  | GetListTransactionTypeAction
  | DispatchListTransactionTypeAction

export type AllActionTypes = UserActionTypes | CommonActionTypes
