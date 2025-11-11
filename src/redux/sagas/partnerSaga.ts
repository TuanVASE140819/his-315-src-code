import { call, put, takeLatest } from 'redux-saga/effects'
import { PARTNER, COMMON } from '../constants/constants'
import { partnerServices } from '../services/partnerServices'

function* getListPartnerSaga(action: any) {
  try {
    const { keyword = '', pageNumber = 1 } = action.payload || {}
    // set loading if you have common loading
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: true })
    const res = yield call(partnerServices.searchPartnerPaged, keyword, pageNumber)
    if (res?.data) {
      yield put({ type: PARTNER.DISPATCH_LIST_PARTNER, payload: res.data })
    }
  } catch (error) {
    console.error('getListPartnerSaga', error)
  } finally {
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: false })
  }
}

function* deletePartnerSaga(action: any) {
  try {
    const id = action.payload
    const onDone = action.onDone
    const res = yield call(partnerServices.deletePartnerById, id)
    if (res?.status === 200 || res?.data?.status === 200) {
      if (typeof onDone === 'function') yield call(onDone)
    }
  } catch (error) {
    console.error('deletePartnerSaga', error)
  }
}

export function* partnerSaga() {
  yield takeLatest(PARTNER.GET_LIST_PARTNER as any, getListPartnerSaga)
  yield takeLatest(PARTNER.DELETE_PARTNER as any, deletePartnerSaga)
}
