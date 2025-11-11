import { call, put, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { TEAM, COMMON } from '../constants/constants'
import { teamServices } from '../services/teamServices'
import ToastCus from '../../components/common/Toast'

function* postInfoTeamSaga({ payload, handleReload }: any): SagaIterator {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    const formData = new FormData()
    formData.append('Name', payload?.name ?? '')
    formData.append('CategoryId', payload?.categoryId)
    if (payload?.files?.length) {
      formData.append('File', payload?.files[0]?.originFileObj)
    }
    yield call(() => teamServices.postInfoTeam(formData))
    yield handleReload()
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
function* putInfoTeamSaga({ payload, handleReload }: any): SagaIterator {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    const formData = new FormData()
    formData.append('Id', payload?.id)
    formData.append('Name', payload?.name ?? '')
    formData.append('CategoryId', payload?.categoryId)
    if (payload?.files?.length) {
      formData.append('File', payload?.files[0]?.originFileObj)
    }
    yield call(() => teamServices.putInfoTeam(formData))
    yield handleReload()
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
function* putToggleActiveTeamSaga({ payload, onLoadTeam }: any): SagaIterator {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    yield call(() => teamServices.putToggleActiveTeam(payload?.id))
    yield onLoadTeam()
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
  yield takeLatest(TEAM.POST_INFO_TEAM as any, postInfoTeamSaga)
  yield takeLatest(TEAM.PUT_INFO_TEAM as any, putInfoTeamSaga)
  yield takeLatest(TEAM.PUT_TOGGLE_ACTIVE_TEAM as any, putToggleActiveTeamSaga)
}
