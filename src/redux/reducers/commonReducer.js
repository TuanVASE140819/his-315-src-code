import { produce } from 'immer'
import { COMMON } from '../constants/constants'
const initialState = {
  isLoadingScreen: false,
  listCategory: [],
  listTeam: [],
  listTransactionType: [],
}

const Common = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    switch (type) {
      case COMMON.DISPATCH_RESET_STORE:
        return initialState
      case COMMON.DISPATCH_LOADING_SCREEN:
        draft.isLoadingScreen = payload
        break
      case COMMON.DISPATCH_LIST_CATEGORY:
        draft.listCategory = payload
        break
      case COMMON.DISPATCH_LIST_TEAM:
        draft.listTeam = payload
        break
      case COMMON.DISPATCH_LIST_TRANSACTION_TYPE:
        draft.listTransactionType = payload
        break
      default:
        return state
    }
  })
}

export default Common
