import { call, put, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { COMMON } from '../constants/constants'
import { commonServices } from '../services/commonServices'

function* getListCategorySaga(): SagaIterator {
  try {
    const { data }: any = yield call(commonServices.getListCategory)
    yield put({
      type: COMMON.DISPATCH_LIST_CATEGORY,
      payload: data,
    })
  } catch (error) {
    console.log('getListCategorySaga : ', error)
  }
}

function* getListTeamSaga({
  categoryId,
}: import('../../types').GetListTeamAction): SagaIterator {
  try {
    const { data }: any = yield call(() =>
      commonServices.getListTeam(categoryId),
    )
    yield put({
      type: COMMON.DISPATCH_LIST_TEAM,
      payload: data,
    })
  } catch (error) {
    console.log('getListTeamSaga : ', error)
  }
}

function* getListTransactionTypeSaga(): SagaIterator {
  try {
    const { data }: any = yield call(commonServices.getListTransactionType)
    yield put({
      type: COMMON.DISPATCH_LIST_TRANSACTION_TYPE,
      payload: data,
    })
  } catch (error) {
    console.log('getListTransactionTypeSaga : ', error)
  }
}

function* getListBangCapSaga(): SagaIterator {
  try {
    const response: any = yield call(commonServices.getAllBangCap)
    const data = response && response.data
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.results)
            ? data.results
            : []
    console.debug('getListBangCapSaga -> list length:', list.length)
    yield put({ type: COMMON.DISPATCH_LIST_BANGCAP, payload: list })
  } catch (error) {
    console.log('getListBangCapSaga : ', error)
  }
}

function* getListChucDanhSaga(): SagaIterator {
  try {
    const response: any = yield call(commonServices.getChucDanh)
    const data = response && response.data
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.results)
            ? data.results
            : []
    console.debug('getListChucDanhSaga -> list length:', list.length)
    yield put({ type: COMMON.DISPATCH_LIST_CHUCDANH, payload: list })
  } catch (error) {
    console.log('getListChucDanhSaga : ', error)
  }
}

function* getListTinhSaga(): SagaIterator {
  try {
    const response: any = yield call(commonServices.getTinh)
    const data = response && response.data
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.results)
            ? data.results
            : []
    console.debug('getListTinhSaga -> list length:', list.length)
    yield put({ type: COMMON.DISPATCH_LIST_TINH, payload: list })
  } catch (error) {
    console.log('getListTinhSaga : ', error)
  }
}

function* getListPhuongXaSaga({
  idTinh,
}: import('../../types').GetListPhuongXaAction): SagaIterator {
  try {
    const response: any = yield call(() =>
      commonServices.getPhuongXaByTinh(idTinh),
    )
    const data = response && response.data
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.results)
            ? data.results
            : []
    console.debug('getListPhuongXaSaga -> list length:', list.length)
    yield put({ type: COMMON.DISPATCH_LIST_PHUONGXA, payload: list })
  } catch (error) {
    console.log('getListPhuongXaSaga : ', error)
  }
}

function* getListKhoaPhongSaga(): SagaIterator {
  try {
    const response: any = yield call(commonServices.getAllKhoaPhongSuDung)
    const data = response && response.data
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.results)
            ? data.results
            : []
    yield put({ type: COMMON.DISPATCH_LIST_KHOAPHONG, payload: list })
  } catch (error) {
    console.log('getListKhoaPhongSaga : ', error)
  }
}

function* getListKhoByKhoaPhongSaga({
  idKhoaPhong,
}: import('../../types').GetListKhoByKhoaPhongAction): SagaIterator {
  try {
    const response: any = yield call(() =>
      commonServices.getKhoByIdKhoaPhong(idKhoaPhong),
    )
    const data = response && response.data
    const list = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.results)
            ? data.results
            : []
    yield put({ type: COMMON.DISPATCH_LIST_KHO_BY_KHOAPHONG, payload: list })
  } catch (error) {
    console.log('getListKhoByKhoaPhongSaga : ', error)
  }
}

export function* commonSaga(): SagaIterator {
  yield takeLatest(COMMON.GET_LIST_CATEGORY, getListCategorySaga)
  yield takeLatest(COMMON.GET_LIST_TEAM, getListTeamSaga)
  yield takeLatest(COMMON.GET_LIST_TRANSACTION_TYPE, getListTransactionTypeSaga)
  yield takeLatest(COMMON.GET_LIST_BANGCAP, getListBangCapSaga)
  yield takeLatest(COMMON.GET_LIST_CHUCDANH, getListChucDanhSaga)
  yield takeLatest(COMMON.GET_LIST_TINH, getListTinhSaga)
  yield takeLatest(COMMON.GET_LIST_PHUONGXA, getListPhuongXaSaga)
  yield takeLatest(COMMON.GET_LIST_KHOAPHONG, getListKhoaPhongSaga)
  yield takeLatest(COMMON.GET_LIST_KHO_BY_KHOAPHONG, getListKhoByKhoaPhongSaga)
}
