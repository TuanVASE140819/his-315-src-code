import { NHANVIEN } from '../constants/constants'

export const getListNhanVienAction = (payload: {
  keyword?: string
  pageIndex?: number
}) => ({
  type: NHANVIEN.GET_LIST_NHANVIEN,
  payload,
})

export const dispatchListNhanVienAction = (payload: {
  data: any[]
  totalCount: number
  totalPages?: number
}) => ({
  type: NHANVIEN.DISPATCH_LIST_NHANVIEN,
  payload,
})
