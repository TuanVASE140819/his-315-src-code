import { combineReducers } from 'redux'
import CommonReducer from './commonReducer'
import UserReducer from './userReducer'
import NhanVienReducer from './nhanVienReducer'

export const rootReducer = combineReducers({
  Common: CommonReducer,
  User: UserReducer,
  NhanVien: NhanVienReducer,
})

export type RootState = ReturnType<typeof rootReducer>
