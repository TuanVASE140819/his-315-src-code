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
function* putInfoCategorySaga({ payload, handleReload }) {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    yield call(() =>
      categoryServices.putInfoCategory({
        id: payload?.id,
        name: payload?.name,
      }),
    )
    yield handleReload()
    ToastCus.fire({
      icon: 'success',
      title: 'Chỉnh sửa bộ môn thành công',
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
function* putActiveCategorySaga({ payload }) {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    yield call(() =>
      categoryServices.putActiveCategory({
        id: payload?.id,
        isAtive: payload?.isAtive ? false : true,
      }),
    )
    ToastCus.fire({
      icon: 'success',
      title: 'Thay đổi sử dụng bộ môn thành công',
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
  yield takeLatest(CATEGORY.PUT_INFO_CATEGORY, putInfoCategorySaga)
  yield takeLatest(CATEGORY.PUT_ACTIVE_CATEGORY, putActiveCategorySaga)
}
