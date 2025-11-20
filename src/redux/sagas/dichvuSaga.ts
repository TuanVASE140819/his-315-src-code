import { call, put, takeLatest } from 'redux-saga/effects'
import { message } from 'antd'
import { DICHVU, COMMON } from '../constants/constants'
import { dichvuServices } from '../services/dichvuServices'
import type { AxiosResponse } from 'axios'
import type { GetListDichVuAction } from '../../types/redux.types'

function* postDichVuSaga(action: any) {
  try {
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: true })
    const res: AxiosResponse = yield call(
      dichvuServices.insertDichVu,
      action.payload,
    )
    if (res?.status === 200 || res?.data?.status === 200) {
      message.success('Tạo dịch vụ thành công')
      if (typeof action.onDone === 'function') {
        yield call(action.onDone)
      }
    } else {
      message.error(res?.data?.message || 'Tạo dịch vụ thất bại')
    }
  } catch (error) {
    console.error('postDichVuSaga error', error)
    message.error('Có lỗi khi tạo dịch vụ')
  } finally {
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: false })
  }
}

function* putDichVuSaga(action: any) {
  try {
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: true })

    console.log('putDichVuSaga - Sending payload:', action.payload)

    const res: AxiosResponse = yield call(
      dichvuServices.updateDichVu,
      action.payload,
    )

    console.log('putDichVuSaga - Response:', res?.data)

    if (res?.status === 200 || res?.data?.status === 200) {
      message.success('Cập nhật dịch vụ thành công')
      if (typeof action.onDone === 'function') {
        yield call(action.onDone)
      }
      // dispatch local update if needed
      yield put({
        type: DICHVU.DISPATCH_UPDATE_DICHVU,
        payload: action.payload,
      })
    } else {
      message.error(res?.data?.message || 'Cập nhật dịch vụ thất bại')
    }
  } catch (error) {
    console.error('putDichVuSaga error', error)
    message.error('Có lỗi khi cập nhật dịch vụ')
  } finally {
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: false })
  }
}

function* getListDichVuSaga(action: GetListDichVuAction) {
  try {
    const {
      idNhomDv = null,
      pageNumber = 1,
      keyword = '',
    } = action.payload || {}

    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: true })

    const res: AxiosResponse = yield call(
      dichvuServices.searchDichVuPaged,
      idNhomDv,
      pageNumber,
      keyword,
    )

    if (
      res?.data?.status === 200 ||
      res?.status === 200 ||
      res?.data?.success
    ) {
      const items = res.data?.data?.data || []
      const totalCount = res.data?.data?.totalCount || 0
      const totalPages = res.data?.data?.totalPages || 0
      const page = res.data?.data?.pageNumber || pageNumber || 1

      // normalize to client shape
      const mapped = (items || []).map((it: any) => ({
        id: it.iddv,
        maDichVu: it.madichvu,
        tenDichVu: it.tendichvu,
        moTa: it.ghichu || '',
        gia: it.dongia ?? 0,
        donvi: it.donvi || '',
        raw: it,
      }))

      yield put({
        type: DICHVU.DISPATCH_LIST_DICHVU,
        payload: { data: mapped, totalCount, totalPages, pageNumber: page },
      })
    } else {
      const errorMsg = res.data?.message || 'Lỗi khi tải danh sách dịch vụ'
      // notify user
    }
  } catch (error) {
    console.error('getListDichVuSaga error:', error)
  } finally {
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: false })
  }
}

export function* dichvuSaga() {
  yield takeLatest(DICHVU.POST_INFO_DICHVU, postDichVuSaga)
  yield takeLatest(DICHVU.PUT_INFO_DICHVU, putDichVuSaga)
  yield takeLatest(DICHVU.GET_LIST_DICHVU, getListDichVuSaga)
}
