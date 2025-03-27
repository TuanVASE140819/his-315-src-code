import { call, put, takeLatest } from 'redux-saga/effects'
import { COMMON } from '../constants/constants'
import { commonServices } from '../services/commonServices'
// import { teamServices } from '../services/teamServices'
// import ToastCus from '../../components/common/Toast'

function* getListCategorySaga() {
  try {
    const { data } = yield call(commonServices.getListCategory)
    yield put({
      type: COMMON.DISPATCH_LIST_CATEGORY,
      payload: data,
    })
  } catch (error) {
    console.log('getListCategorySaga : ', error)
  }
}
function* getListTeamSaga({ categoryId }) {
  try {
    const { data } = yield call(() => commonServices.getListTeam(categoryId))
    yield put({
      type: COMMON.DISPATCH_LIST_TEAM,
      payload: data,
    })
  } catch (error) {
    console.log('getListTeamSaga : ', error)
  }
}
function* getListTransactionTypeSaga() {
  try {
    const { data } = yield call(commonServices.getListTransactionType)
    yield put({
      type: COMMON.DISPATCH_LIST_TRANSACTION_TYPE,
      payload: data,
    })
  } catch (error) {
    console.log('getListTransactionTypeSaga : ', error)
  }
}

export function* commonSaga() {
  yield takeLatest(COMMON.GET_LIST_CATEGORY, getListCategorySaga)
  yield takeLatest(COMMON.GET_LIST_TEAM, getListTeamSaga)
  yield takeLatest(COMMON.GET_LIST_TRANSACTION_TYPE, getListTransactionTypeSaga)
}
