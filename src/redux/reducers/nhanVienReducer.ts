import { produce } from 'immer'
import { NHANVIEN } from '../constants/constants'

interface NhanVienItem {
  id: number
  manv: string
  tennv: string
  gioitinh: string
  ngaysinh?: string
  diachi?: string
  chucdanhviettat?: string
  tenchucdanh?: string
  thoiviec?: boolean
  [key: string]: any // For other API fields that might come
}

interface NhanVienState {
  list: NhanVienItem[]
  totalCount: number
  totalPages: number
  loading: boolean
  error: string | null
}

const initialState: NhanVienState = {
  list: [],
  totalCount: 0,
  totalPages: 0,
  loading: false,
  error: null,
}

interface NhanVienAction {
  type: string
  payload?: {
    data?: NhanVienItem[]
    totalCount?: number
    totalPages?: number
  }
}

const NhanVienReducer = (
  state = initialState,
  action: NhanVienAction,
): NhanVienState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case NHANVIEN.DISPATCH_LIST_NHANVIEN:
        draft.list = action.payload?.data || []
        draft.totalCount = action.payload?.totalCount || 0
        draft.totalPages = action.payload?.totalPages || 0
        draft.loading = false
        draft.error = null
        break

      case NHANVIEN.GET_LIST_NHANVIEN:
        draft.loading = true
        draft.error = null
        break

      default:
        return state
    }
  })
}

export default NhanVienReducer
