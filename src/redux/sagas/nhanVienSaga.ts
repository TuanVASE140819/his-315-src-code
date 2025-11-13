import { call, put, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { AxiosResponse } from 'axios'
import { message } from 'antd'
import { NHANVIEN, COMMON } from '../constants/constants'
import { nhanVienServices } from '../services/nhanVienServices'
import { GetListNhanVienAction } from '../../types'
import type { SagaGen } from '../../types/saga.types'

interface NhanVienResponse {
  success: boolean
  data: {
    data: any[]
    totalCount: number
    totalPages: number
    pageNumber: number
  }
}

/**
 * Saga to fetch list of employees with search and pagination
 * @param action - Action containing keyword and pageIndex
 */
function* getListNhanVienSaga(action: GetListNhanVienAction): SagaGen {
  const payload = action?.payload || {}
  yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: true })

  try {
    const { keyword = '', pageIndex = 1 } = payload

    const res: AxiosResponse<NhanVienResponse> = yield call(
      nhanVienServices.searchNhanVien,
      keyword,
      pageIndex,
    )

    const items = res.data?.data?.data || []
    const totalCount = res.data?.data?.totalCount || 0
    const totalPages = res.data?.data?.totalPages || 0

    yield put({
      type: NHANVIEN.DISPATCH_LIST_NHANVIEN,
      payload: { data: items, totalCount, totalPages },
    })
  } catch (error) {
    console.error('getListNhanVienSaga error:', error)
    message.error('Không thể tải danh sách nhân viên. Vui lòng thử lại!')
    yield put({
      type: NHANVIEN.DISPATCH_LIST_NHANVIEN,
      payload: { data: [], totalCount: 0, totalPages: 0 },
    })
  } finally {
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: false })
  }
}

export function* nhanVienSaga(): SagaIterator {
  yield takeLatest(NHANVIEN.GET_LIST_NHANVIEN, getListNhanVienSaga)
}
