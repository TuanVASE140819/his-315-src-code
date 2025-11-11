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

function* getListTeamSaga({ categoryId }: any): SagaIterator {
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

export function* commonSaga(): SagaIterator {
  yield takeLatest(COMMON.GET_LIST_CATEGORY, getListCategorySaga)
  yield takeLatest(COMMON.GET_LIST_TEAM, getListTeamSaga)
  yield takeLatest(COMMON.GET_LIST_TRANSACTION_TYPE, getListTransactionTypeSaga)
}
