import { produce } from 'immer'
import { COMMON } from '../constants/constants'
const initialState = {
  isLoadingScreen: false,
  listCategory: [],
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
      default:
        return state
    }
  })
}

export default Common
