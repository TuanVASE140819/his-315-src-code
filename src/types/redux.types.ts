import type { NavigateFunction } from 'react-router-dom'
import type {
  User,
  LoginCredentials,
  ChangePasswordPayload,
  Company,
  Department,
} from './user.types'
import type {
  Category,
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from './category.types'
import type { Team, CreateTeamPayload, UpdateTeamPayload } from './team.types'
import type {
  League,
  CreateLeaguePayload,
  UpdateLeaguePayload,
} from './league.types'
import type {
  Game,
  CreateGamePayload,
  CreateGameBatchPayload,
  UpdateGamePayload,
  UpdateGameResultPayload,
} from './game.types'
import type { TransactionTypeOption } from './customer.types'
import type { PartnerItem, PartnerPagedResponse } from './partner.types'

// ============ COMMON TYPE ALIASES ============

type PagedList<T = any> = {
  list: T[]
  totalCount: number
  totalPages: number
  pageNumber: number
}

type ReloadCallback = () => void

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
  listChuyenKhoa?: any[]
  listDichVuNhom?: any[]
  listBangCap?: any[]
  listChucDanh?: any[]
  listTinh?: any[]
  listPhuongXa?: any[]
  listKhoaPhong?: any[]
  listKhoByKhoaPhong?: any[]
  // partner list is kept in its own reducer (Partner)
}

export interface RootState {
  User: UserState
  Common: CommonState
  Partner: PagedList<PartnerItem>
  DichVu?: PagedList
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
  handleReload?: ReloadCallback
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

export interface GetListKhoaPhongAction {
  type: string
}

export interface GetListDichVuNhomAction {
  type: string
}

export interface DispatchListDichVuNhomAction {
  type: string
  payload: any[]
}

export interface GetListChuyenKhoaAction {
  type: string
}

export interface DispatchListChuyenKhoaAction {
  type: string
  payload: any[]
}

export interface GetListDichVuAction {
  type: string
  payload?: {
    idNhomDv?: number | null
    pageNumber?: number
    keyword?: string
  }
}

export interface DispatchListDichVuAction {
  type: string
  payload: Omit<PagedList, 'list'> & { data: any[] }
}

export interface DispatchListKhoaPhongAction {
  type: string
  payload: any[]
}

export interface GetListKhoByKhoaPhongAction {
  type: string
  idKhoaPhong: number | string
}

export interface DispatchListKhoByKhoaPhongAction {
  type: string
  payload: any[]
}

// Category Actions
export interface PostCategoryAction {
  type: string
  payload: CreateCategoryPayload
  handleReload?: ReloadCallback
}

export interface PutCategoryAction {
  type: string
  payload: UpdateCategoryPayload
  handleReload?: ReloadCallback
}

export interface ToggleActiveCategoryAction {
  type: string
  payload: { id: number }
  onLoadCategory?: ReloadCallback
}

// Team Actions
export interface PostTeamAction {
  type: string
  payload: CreateTeamPayload
  handleReload?: ReloadCallback
}

export interface PutTeamAction {
  type: string
  payload: UpdateTeamPayload
  handleReload?: ReloadCallback
}

export interface ToggleActiveTeamAction {
  type: string
  payload: { id: number }
  onLoadTeam?: ReloadCallback
}

// League Actions
export interface PostLeagueAction {
  type: string
  payload: CreateLeaguePayload
  handleReload?: ReloadCallback
}

export interface PutLeagueAction {
  type: string
  payload: UpdateLeaguePayload
  handleReload?: ReloadCallback
}

export interface ToggleActiveLeagueAction {
  type: string
  payload: { id: number }
  onLoadLeague?: ReloadCallback
}

// Game Actions
export interface PostGameAction {
  type: string
  payload: CreateGameBatchPayload
  handleReloadAddGame?: ReloadCallback
}

export interface PutGameAction {
  type: string
  payload: UpdateGamePayload
  handleCloseEditGame?: ReloadCallback
}

export interface ToggleActiveGameAction {
  type: string
  payload: { id: number }
  onLoadGame?: ReloadCallback
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
  payload: Omit<PagedList, 'list' | 'pageNumber'> & {
    data: any[]
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
  onLoadGame?: ReloadCallback
}

// Customer Actions
export interface ToggleActiveCustomerAction {
  type: string
  payload: { id: number }
  onLoad?: ReloadCallback
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
  | GetListKhoaPhongAction
  | DispatchListKhoaPhongAction
  | GetListChuyenKhoaAction
  | DispatchListChuyenKhoaAction
  | GetListKhoByKhoaPhongAction
  | DispatchListKhoByKhoaPhongAction

export type AllActionTypes = UserActionTypes | CommonActionTypes
