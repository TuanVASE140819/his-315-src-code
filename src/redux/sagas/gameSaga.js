import { call, put, takeLatest } from 'redux-saga/effects'
import { GAME, COMMON } from '../constants/constants'
import { gameServices } from '../services/gameServices'
import ToastCus from '../../components/common/Toast'

function* postInfoGameSaga({ payload, handleReloadAddGame }) {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    yield call(() => gameServices.postInfoGame(payload))
    yield handleReloadAddGame()
    ToastCus.fire({
      icon: 'success',
      title: 'Thêm trận đấu thành công',
    })
  } catch (error) {
    console.log('postInfoGameSaga : ', error)
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}
function* putInfoGameSaga({ payload, handleCloseEditGame }) {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    yield call(() => gameServices.putInfoGame(payload))
    yield handleCloseEditGame()
    ToastCus.fire({
      icon: 'success',
      title: 'Chỉnh sửa trận đấu thành công',
    })
  } catch (error) {
    console.log('putInfoGameSaga : ', error)
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}
function* putToggleActiveGameSaga({ payload, onLoadGame }) {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    // yield call(() => gameServices.putToggleActiveGame(payload?.id))
    yield onLoadGame()
    ToastCus.fire({
      icon: 'success',
      title: 'Thay đổi sử dụng trận đấu thành công',
    })
  } catch (error) {
    console.log('putToggleActiveGameSaga : ', error)
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}
function* putMatchResultGameSaga({ payload, onLoadGame }) {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    // yield call(() => gameServices.putMatchResultGame(payload?.id))
    yield onLoadGame()
    ToastCus.fire({
      icon: 'success',
      title: 'Trả kết quả trận đấu thành công',
    })
  } catch (error) {
    console.log('putMatchResultGameSaga : ', error)
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}

export function* gameSaga() {
  yield takeLatest(GAME.POST_INFO_GAME, postInfoGameSaga)
  yield takeLatest(GAME.PUT_INFO_GAME, putInfoGameSaga)
  yield takeLatest(GAME.PUT_TOGGLE_ACTIVE_GAME, putToggleActiveGameSaga)
  yield takeLatest(GAME.PUT_MATCH_RESULT_GAME, putMatchResultGameSaga)
}
