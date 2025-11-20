import { produce } from 'immer'
import { COMMON } from '../constants/constants'
import {
  CommonState,
  CommonActionTypes,
  DispatchListCategoryAction,
  DispatchListTeamAction,
  DispatchListTransactionTypeAction,
} from '../../types'

const initialState: CommonState = {
  isLoadingScreen: false,
  listCategory: [],
  listTeam: [],
  listTransactionType: [],
  listChuyenKhoa: [],
  listDichVuNhom: [],
}

const CommonReducer = (
  state = initialState,
  action: CommonActionTypes,
): CommonState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case COMMON.DISPATCH_RESET_STORE:
        return initialState
      case COMMON.DISPATCH_LOADING_SCREEN:
        if ('payload' in action && typeof action.payload === 'boolean') {
          draft.isLoadingScreen = action.payload
        }
        break
      case COMMON.DISPATCH_LIST_CATEGORY:
        if ('payload' in action && Array.isArray(action.payload)) {
          draft.listCategory = (action as DispatchListCategoryAction).payload
        }
        break
      case COMMON.DISPATCH_LIST_TEAM:
        if ('payload' in action && Array.isArray(action.payload)) {
          draft.listTeam = (action as DispatchListTeamAction).payload
        }
        break
      case COMMON.DISPATCH_LIST_TRANSACTION_TYPE:
        if ('payload' in action && Array.isArray(action.payload)) {
          draft.listTransactionType = (
            action as DispatchListTransactionTypeAction
          ).payload
        }
        break
      case COMMON.DISPATCH_LIST_BANGCAP:
        if ('payload' in action && Array.isArray(action.payload)) {
          draft.listBangCap = (action as any).payload
        }
        break
      case COMMON.DISPATCH_LIST_CHUCDANH:
        if ('payload' in action && Array.isArray(action.payload)) {
          draft.listChucDanh = (action as any).payload
        }
        break
      case COMMON.DISPATCH_LIST_TINH:
        if ('payload' in action && Array.isArray(action.payload)) {
          draft.listTinh = (action as any).payload
        }
        break
      case COMMON.DISPATCH_LIST_PHUONGXA:
        if ('payload' in action && Array.isArray(action.payload)) {
          draft.listPhuongXa = (action as any).payload
        }
        break
      case COMMON.DISPATCH_LIST_KHOAPHONG:
        if ('payload' in action && Array.isArray(action.payload)) {
          draft.listKhoaPhong = (action as any).payload
        }
        break
      case COMMON.DISPATCH_LIST_KHO_BY_KHOAPHONG:
        if ('payload' in action && Array.isArray(action.payload)) {
          draft.listKhoByKhoaPhong = (action as any).payload
        }
        break
      case COMMON.DISPATCH_LIST_CHUYENKHOA:
        if ('payload' in action && Array.isArray(action.payload)) {
          draft.listChuyenKhoa = (action as any).payload
        }
        break
      case COMMON.DISPATCH_LIST_DICHVU_NHOM:
        if ('payload' in action && Array.isArray(action.payload)) {
          draft.listDichVuNhom = (action as any).payload
        }
        break
        break
      default:
        return state
    }
  })
}

export default CommonReducer
