import { call, put, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { TEAM, COMMON } from '../constants/constants'
import { teamServices } from '../services/teamServices'
import ToastCus from '../../components/common/Toast'

function* postInfoTeamSaga({
  payload,
  handleReload,
}: import('../../types').PostTeamAction): import('../../types/saga.types').SagaGen {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    const formData = new FormData()
    formData.append('Name', payload?.name ?? '')
    formData.append('CategoryId', String(payload?.categoryId ?? ''))
    if (payload?.files?.length) {
      formData.append('File', payload?.files[0]?.originFileObj)
    }
    yield call(() => teamServices.postInfoTeam(formData))
    // call optional callback using effect to satisfy saga typing
    if (handleReload) yield call(() => handleReload())
    ToastCus.fire({
      icon: 'success',
      title: 'Thêm đội thi đấu thành công',
    })
  } catch (error) {
    console.log('postInfoTeamSaga : ', error)
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}
function* putInfoTeamSaga({
  payload,
  handleReload,
}: import('../../types').PutTeamAction): import('../../types/saga.types').SagaGen {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    const formData = new FormData()
    formData.append('Id', String(payload?.id ?? ''))
    formData.append('Name', payload?.name ?? '')
    formData.append('CategoryId', String(payload?.categoryId ?? ''))
    if (payload?.files?.length) {
      formData.append('File', payload?.files[0]?.originFileObj)
    }
    yield call(() => teamServices.putInfoTeam(formData))
    if (handleReload) yield call(() => handleReload())
    ToastCus.fire({
      icon: 'success',
      title: 'Chỉnh sửa đội thi đấu thành công',
    })
  } catch (error) {
    console.log('putInfoTeamSaga : ', error)
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}
function* putToggleActiveTeamSaga({
  payload,
  onLoadTeam,
}: import('../../types').ToggleActiveTeamAction): import('../../types/saga.types').SagaGen {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    yield call(() => teamServices.putToggleActiveTeam(payload?.id))
    if (onLoadTeam) yield call(() => onLoadTeam())
    ToastCus.fire({
      icon: 'success',
      title: 'Thay đổi sử dụng đội thi đấu thành công',
    })
  } catch (error) {
    console.log('putToggleActiveTeamSaga : ', error)
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}

export function* teamSaga(): SagaIterator {
  yield takeLatest(TEAM.POST_INFO_TEAM, postInfoTeamSaga)
  yield takeLatest(TEAM.PUT_INFO_TEAM, putInfoTeamSaga)
  yield takeLatest(TEAM.PUT_TOGGLE_ACTIVE_TEAM, putToggleActiveTeamSaga)
}
