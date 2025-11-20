import { combineReducers } from 'redux'
import commonReducer from './commonReducer'
import nhanVienReducer from './nhanVienReducer'
import partnerReducer from './partnerReducer'
import userReducer from './userReducer'
import dichvuReducer from './dichvuReducer'
import phongKhamReducer from './phongKhamReducer'
export const rootReducer = combineReducers({
  Common: commonReducer,
  User: userReducer,
  NhanVien: nhanVienReducer,
  Partner: partnerReducer,
  DichVu: dichvuReducer,
  PhongKham: phongKhamReducer,
})

export type RootState = ReturnType<typeof rootReducer>
