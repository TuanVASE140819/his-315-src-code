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
      default:
        return state
    }
  })
}

export default CommonReducer
