import { COMMON } from '../constants/constants'
import {
  GetListCategoryAction,
  GetListTeamAction,
  GetListTransactionTypeAction,
} from '../../types'

import {
  GetListBangCapAction,
  GetListChucDanhAction,
  GetListTinhAction,
  GetListPhuongXaAction,
} from '../../types'

export const getListCategoryAction = (): GetListCategoryAction => ({
  type: COMMON.GET_LIST_CATEGORY,
})

export const getListTeamAction = (
  categoryId?: string | number,
): GetListTeamAction => ({
  type: COMMON.GET_LIST_TEAM,
  categoryId,
})

export const getListTransactionTypeAction =
  (): GetListTransactionTypeAction => ({
    type: COMMON.GET_LIST_TRANSACTION_TYPE,
  })

export const getListBangCapAction = (): GetListBangCapAction => ({
  type: COMMON.GET_LIST_BANGCAP,
})

export const getListChucDanhAction = (): GetListChucDanhAction => ({
  type: COMMON.GET_LIST_CHUCDANH,
})

export const getListTinhAction = (): GetListTinhAction => ({
  type: COMMON.GET_LIST_TINH,
})

export const getListPhuongXaAction = (
  idTinh: string | number,
): GetListPhuongXaAction => ({
  type: COMMON.GET_LIST_PHUONGXA,
  idTinh,
})
