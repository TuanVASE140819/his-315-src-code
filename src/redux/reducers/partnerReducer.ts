import { produce } from 'immer'
import { PARTNER } from '../constants/constants'
import type { PartnerItem } from '../../types/partner.types'

interface PartnerState {
  list: PartnerItem[]
  totalCount: number
  totalPages: number
  pageNumber: number
  loading: boolean
  error: string | null
}

const initialState: PartnerState = {
  list: [],
  totalCount: 0,
  totalPages: 0,
  pageNumber: 1,
  loading: false,
  error: null,
}

interface PartnerAction {
  type: string
  payload?: {
    data?: PartnerItem[]
    totalCount?: number
    totalPages?: number
    pageNumber?: number
  }
}

const PartnerReducer = (
  state = initialState,
  action: PartnerAction,
): PartnerState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case PARTNER.DISPATCH_LIST_PARTNER:
        draft.list = action.payload?.data || []
        draft.totalCount = action.payload?.totalCount || 0
        draft.totalPages = action.payload?.totalPages || 0
        draft.pageNumber = action.payload?.pageNumber || 1
        draft.loading = false
        draft.error = null
        break

      case PARTNER.GET_LIST_PARTNER:
        draft.loading = true
        draft.error = null
        break

      default:
        return state
    }
  })
}

export default PartnerReducer
