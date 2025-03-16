import { call, put, takeLatest } from 'redux-saga/effects'
import { CATEGORY, COMMON } from '../constants/constants'
import { categoryServices } from '../services/categoryServices'
import ToastCus from '../../components/common/Toast'

function* postInfoCategorySaga({ payload, handleReload }) {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    yield call(() => categoryServices.postInfoCategory({ name: payload?.name }))
    yield handleReload()
    ToastCus.fire({
      icon: 'success',
      title: 'Thêm bộ môn thành công',
    })
  } catch (error) {
    console.log(error)
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}

export function* categorySaga() {
  yield takeLatest(CATEGORY.POST_INFO_CATEGORY, postInfoCategorySaga)
}
