import { combineReducers } from 'redux'
import commonReducer from './commonReducer'
import nhanVienReducer from './nhanVienReducer'
import partnerReducer from './partnerReducer'
import userReducer from './userReducer'
import { DICHVU } from '../constants/constants'

// lightweight DichVu reducer inside rootReducer to hold transient updates
const initialDichVuState = {
  list: [] as any[],
}

function dichvuReducer(state = initialDichVuState, action: any) {
  switch (action.type) {
    case DICHVU.DISPATCH_UPDATE_DICHVU:
      // Replace or insert the updated item by id
      const updated = action.payload
      return {
        ...state,
        list: state.list.map((it: any) =>
          it.id === updated.id ? { ...it, ...updated } : it,
        ),
      }
    default:
      return state
  }
}
export const rootReducer = combineReducers({
  Common: commonReducer,
  User: userReducer,
  NhanVien: nhanVienReducer,
  Partner: partnerReducer,
  DichVu: dichvuReducer,
})

export type RootState = ReturnType<typeof rootReducer>
