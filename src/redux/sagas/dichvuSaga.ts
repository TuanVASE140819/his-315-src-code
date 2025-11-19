import { call, put, takeLatest } from 'redux-saga/effects'
import { message } from 'antd'
import { DICHVU, COMMON } from '../constants/constants'
import { dichvuServices } from '../services/dichvuServices'
import type { AxiosResponse } from 'axios'

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
    const res: AxiosResponse = yield call(
      dichvuServices.updateDichVu,
      action.payload,
    )
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

export function* dichvuSaga() {
  yield takeLatest(DICHVU.POST_INFO_DICHVU, postDichVuSaga)
  yield takeLatest(DICHVU.PUT_INFO_DICHVU, putDichVuSaga)
}
