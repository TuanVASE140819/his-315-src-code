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
  CreateGameBatchPayload,
  UpdateGamePayload,
  UpdateGameResultPayload,
} from './game.types'
import { TransactionTypeOption } from './customer.types'
import { PartnerItem, PartnerPagedResponse } from './partner.types'

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
  listBangCap?: any[]
  listChucDanh?: any[]
  listTinh?: any[]
  listPhuongXa?: any[]
  // partner list is kept in its own reducer (Partner)
}

export interface RootState {
  User: UserState
  Common: CommonState
  Partner: {
    list: PartnerItem[]
    totalCount: number
    totalPages: number
    pageNumber: number
  }
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

export interface GetCompaniesForUserAction {
  type: string
  payload: string // taiKhoan
}

export interface GetDepartmentsForUserAction {
  type: string
  payload: {
    taiKhoan: string
    idCongTy: number | string
  }
}

export interface DispatchCompaniesForUserAction {
  type: string
  payload: Company[]
}

export interface DispatchDepartmentsForUserAction {
  type: string
  payload: Department[]
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

export interface GetListBangCapAction {
  type: string
}

export interface DispatchListBangCapAction {
  type: string
  payload: any[]
}

export interface GetListChucDanhAction {
  type: string
}

export interface DispatchListChucDanhAction {
  type: string
  payload: any[]
}

export interface GetListTinhAction {
  type: string
}

export interface DispatchListTinhAction {
  type: string
  payload: any[]
}

export interface GetListPhuongXaAction {
  type: string
  idTinh?: string | number
}

export interface DispatchListPhuongXaAction {
  type: string
  payload: any[]
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
  payload: CreateGameBatchPayload
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

// Nhân viên Actions
export interface GetListNhanVienAction {
  type: string
  payload?: {
    keyword?: string
    pageIndex?: number
  }
}

export interface DispatchListNhanVienAction {
  type: string
  payload: {
    data: any[]
    totalCount: number
    totalPages?: number
  }
}

// Partner Actions
export interface GetListPartnerAction {
  type: string
  payload?: {
    keyword?: string
    pageNumber?: number
  }
}

export interface DispatchListPartnerAction {
  type: string
  payload: PartnerPagedResponse
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
  | GetListBangCapAction
  | DispatchListBangCapAction
  | GetListChucDanhAction
  | DispatchListChucDanhAction
  | GetListTinhAction
  | DispatchListTinhAction
  | GetListPhuongXaAction
  | DispatchListPhuongXaAction

export type AllActionTypes = UserActionTypes | CommonActionTypes
