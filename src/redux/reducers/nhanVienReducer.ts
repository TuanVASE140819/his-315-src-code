import { produce } from 'immer'
import { NHANVIEN } from '../constants/constants'

const initialState = {
  list: [],
  totalCount: 0,
  totalPages: 0,
}

const NhanVienReducer = (state = initialState, action: any) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case NHANVIEN.DISPATCH_LIST_NHANVIEN:
        draft.list = action.payload?.data || []
        draft.totalCount = action.payload?.totalCount || 0
        draft.totalPages = action.payload?.totalPages || 0
        break
      default:
        return state
    }
  })
}

export default NhanVienReducer
