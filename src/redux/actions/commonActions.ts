import { COMMON } from '../constants/constants'
import {
  GetListCategoryAction,
  GetListTeamAction,
  GetListTransactionTypeAction,
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
