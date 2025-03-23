import { call, put, takeLatest } from 'redux-saga/effects'
import { COMMON } from '../constants/constants'
import { commonServices } from '../services/commonServices'
import { teamServices } from '../services/teamServices'
// import ToastCus from '../../components/common/Toast'

function* getListCategorySaga() {
  try {
    const { data } = yield call(commonServices.getListCategory)
    yield put({
      type: COMMON.DISPATCH_LIST_CATEGORY,
      payload: data,
    })
  } catch (error) {
    console.log(error)
  }
}
function* getListTeamSaga({ categoryId }) {
  try {
    const { data } = yield call(() =>
      teamServices.getListTeamSearch(categoryId, ''),
    )
    yield put({
      type: COMMON.DISPATCH_LIST_TEAM,
      payload: data,
    })
  } catch (error) {
    console.log(error)
  }
}

export function* commonSaga() {
  yield takeLatest(COMMON.GET_LIST_CATEGORY, getListCategorySaga)
  yield takeLatest(COMMON.GET_LIST_TEAM, getListTeamSaga)
}
