import { call, put, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { NHANVIEN, COMMON } from '../constants/constants'
import { nhanVienServices } from '../services/nhanVienServices'

function* getListNhanVienSaga(action: any): SagaIterator {
  const payload = action?.payload || {}
  yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: true })
  try {
    const { keyword = '', pageIndex = 1 } = payload
    const res = yield call(nhanVienServices.searchNhanVien, keyword, pageIndex)
    const items = res.data?.data?.data || []
    const totalCount = res.data?.data?.totalCount || 0
    const totalPages = res.data?.data?.totalPages || 0
    yield put({
      type: NHANVIEN.DISPATCH_LIST_NHANVIEN,
      payload: { data: items, totalCount, totalPages },
    })
  } catch (error) {
    console.error('getListNhanVienSaga', error)
  } finally {
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: false })
  }
}

export function* nhanVienSaga(): SagaIterator {
  yield takeLatest(NHANVIEN.GET_LIST_NHANVIEN as any, getListNhanVienSaga as any)
}
