import { produce } from 'immer'
import { USER, COMMON } from '../constants/constants'
import { UserState, UserActionTypes } from '../../types'

const initialState: UserState = {
  infoUser: null,
  companies: [],
  departments: [],
}

const UserReducer = (
  state = initialState,
  action: UserActionTypes,
): UserState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case COMMON.DISPATCH_RESET_STORE:
        return initialState
      case USER.DISPATCH_INFO_LOGIN:
        if ('payload' in action && action.type === USER.DISPATCH_INFO_LOGIN) {
          // action.payload can be a union; assert it's a User for this case
          draft.infoUser = action.payload as unknown as import('../../types').User
        }
        break
      case USER.DISPATCH_COMPANIES_FOR_USER:
        if ('payload' in action) {
          // payload should be Company[] for this action
          draft.companies = action.payload as unknown as import('../../types').Company[]
        }
        break
      case USER.DISPATCH_DEPARTMENTS_FOR_USER:
        if ('payload' in action) {
          // payload should be Department[] for this action
          draft.departments = action.payload as unknown as import('../../types').Department[]
        }
        break
      default:
        return state
    }
  })
}

export default UserReducer
