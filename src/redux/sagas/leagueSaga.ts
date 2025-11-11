import { call, put, takeLatest } from 'redux-saga/effects'
import { LEAGUE, COMMON } from '../constants/constants'
import { leagueServices } from '../services/leagueServices'
import ToastCus from '../../components/common/Toast'

function* postInfoLeagueSaga({
  payload,
  handleReload,
}: import('../../types').PostLeagueAction): import('../../types/saga.types').SagaGen {
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
    if (handleReload) yield call(() => handleReload())
    ToastCus.fire({
      icon: 'success',
      title: 'Thêm giải đấu thành công',
    })
  } catch (error) {
    console.log('postInfoLeagueSaga : ', error)
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}
function* putInfoLeagueSaga({
  payload,
  handleReload,
}: import('../../types').PutLeagueAction): import('../../types/saga.types').SagaGen {
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
    if (handleReload) yield call(() => handleReload())
    ToastCus.fire({
      icon: 'success',
      title: 'Chỉnh sửa giải đấu thành công',
    })
  } catch (error) {
    console.log('putInfoLeagueSaga : ', error)
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}
function* putToggleActiveLeagueSaga({
  payload,
  onLoadLeague,
}: import('../../types').ToggleActiveLeagueAction): import('../../types/saga.types').SagaGen {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    yield call(() => leagueServices.putToggleActiveLeague(payload?.id))
    if (onLoadLeague) yield call(() => onLoadLeague())
    ToastCus.fire({
      icon: 'success',
      title: 'Thay đổi sử dụng giải đấu thành công',
    })
  } catch (error) {
    console.log('putToggleActiveLeagueSaga : ', error)
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}

export function* leagueSaga(): import('../../types/saga.types').SagaGen {
  yield takeLatest(LEAGUE.POST_INFO_LEAGUE, postInfoLeagueSaga)
  yield takeLatest(LEAGUE.PUT_INFO_LEAGUE, putInfoLeagueSaga)
  yield takeLatest(LEAGUE.PUT_TOGGLE_ACTIVE_LEAGUE, putToggleActiveLeagueSaga)
}
