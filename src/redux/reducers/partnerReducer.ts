import { produce } from 'immer'
import { PARTNER } from '../constants/constants'

const initialState = {
  list: [],
  totalCount: 0,
  totalPages: 0,
  pageNumber: 1,
}

const PartnerReducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case PARTNER.DISPATCH_LIST_PARTNER:
        draft.list = action.payload?.data || []
        draft.totalCount = action.payload?.totalCount || 0
        draft.totalPages = action.payload?.totalPages || 0
        draft.pageNumber = action.payload?.pageNumber || 1
        break
      default:
        return state
    }
  })
}

export default PartnerReducer
