import { call, put, takeLatest } from 'redux-saga/effects'
import { CUSTOMER, COMMON } from '../constants/constants'
import { customerServices } from '../services/customerServices'
import ToastCus from '../../components/common/Toast'

function* putToggleActiveCustomerSaga({
  payload,
  onLoad,
}: import('../../types/saga.types').SagaAction & {
  onLoad?: () => void
}): import('../../types/saga.types').SagaGen {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    yield call(() => customerServices.putToggleActiveCustomer(payload?.id))
    if (onLoad) onLoad()
    ToastCus.fire({
      icon: 'success',
      title: 'Thay đổi hiệu lực tài khoản thành công',
    })
  } catch (error) {
    console.log('putToggleActiveCustomerSaga : ', error)
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}

export function* customerSaga() {
  // cast action type to any to satisfy redux-saga typing during incremental migration
  yield takeLatest(
    CUSTOMER.PUT_TOGGLE_ACTIVE_CUSTOMER as import('../../types/saga.types').SagaActionType,
    putToggleActiveCustomerSaga,
  )
}
