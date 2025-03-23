import { call, put, takeLatest } from 'redux-saga/effects'
import { LEAGUE, COMMON } from '../constants/constants'
import { leagueServices } from '../services/leagueServices'
import ToastCus from '../../components/common/Toast'

function* postInfoLeagueSaga({ payload, handleReload }) {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    yield call(() =>
      leagueServices.postInfoLeague({
        categoryId: payload?.categoryId,
        name: payload?.name,
      }),
    )
    yield handleReload()
    ToastCus.fire({
      icon: 'success',
      title: 'Thêm giải đấu thành công',
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
function* putInfoLeagueSaga({ payload, handleReload }) {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    yield call(() =>
      leagueServices.putInfoLeague({
        id: payload?.id,
        name: payload?.name,
        categoryId: payload?.categoryId,
      }),
    )
    yield handleReload()
    ToastCus.fire({
      icon: 'success',
      title: 'Chỉnh sửa giải đấu thành công',
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
function* putActiveLeagueSaga({ payload, onLoadLeague }) {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    yield call(() => leagueServices.putActiveLeague(payload?.id))
    yield onLoadLeague()
    ToastCus.fire({
      icon: 'success',
      title: 'Thay đổi sử dụng giải đấu thành công',
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

export function* leagueSaga() {
  yield takeLatest(LEAGUE.POST_INFO_LEAGUE, postInfoLeagueSaga)
  yield takeLatest(LEAGUE.PUT_INFO_LEAGUE, putInfoLeagueSaga)
  yield takeLatest(LEAGUE.PUT_ACTIVE_LEAGUE, putActiveLeagueSaga)
}
