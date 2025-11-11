import { combineReducers } from 'redux'
import CommonReducer from './commonReducer'
import UserReducer from './userReducer'
import NhanVienReducer from './nhanVienReducer'
import PartnerReducer from './partnerReducer'

export const rootReducer = combineReducers({
  Common: CommonReducer,
  User: UserReducer,
  NhanVien: NhanVienReducer,
  Partner: PartnerReducer,
})

export type RootState = ReturnType<typeof rootReducer>
