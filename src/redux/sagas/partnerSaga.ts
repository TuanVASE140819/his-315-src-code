import { call, put, takeLatest } from 'redux-saga/effects'
import { message } from 'antd'
import { PARTNER, COMMON } from '../constants/constants'
import { partnerServices } from '../services/partnerServices'
import type { GetListPartnerAction } from '../../types/redux.types'
import type { AxiosResponse } from 'axios'

interface DeletePartnerAction {
  type: typeof PARTNER.DELETE_PARTNER
  payload: number
  onDone?: () => void
}

/**
 * Saga to fetch partner list with pagination and search
 */
function* getListPartnerSaga(action: GetListPartnerAction) {
  try {
    const { keyword = '', pageNumber = 1 } = action.payload || {}

    // Set loading state
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: true })

    const res: AxiosResponse = yield call(
      partnerServices.searchPartnerPaged,
      keyword,
      pageNumber,
    )

    if (res?.data?.status === 200 || res?.data?.success) {
      // API returns structure: { status, message, data: { totalCount, totalPages, pageNumber, data: [...] } }
      const items = res.data?.data?.data || []
      const totalCount = res.data?.data?.totalCount || 0
      const totalPages = res.data?.data?.totalPages || 0
      const page = res.data?.data?.pageNumber || pageNumber || 1

      yield put({
        type: PARTNER.DISPATCH_LIST_PARTNER,
        payload: { data: items, totalCount, totalPages, pageNumber: page },
      })
    } else {
      const errorMsg = res.data?.message || 'Lỗi khi tải danh sách đối tác'
      message.error(errorMsg)
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Có lỗi xảy ra khi tải danh sách đối tác'

    console.error('getListPartnerSaga error:', error)
    message.error(errorMessage)
  } finally {
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: false })
  }
}

/**
 * Saga to delete a partner by ID
 */
function* deletePartnerSaga(action: DeletePartnerAction) {
  try {
    const id = action.payload
    const onDone = action.onDone

    const res: AxiosResponse = yield call(partnerServices.deletePartnerById, id)

    if (res?.status === 200 || res?.data?.status === 200) {
      message.success('Xóa đối tác thành công')

      if (typeof onDone === 'function') {
        yield call(onDone)
      }
    } else {
      const errorMsg = res?.data?.message || 'Không thể xóa đối tác'
      message.error(errorMsg)
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Có lỗi xảy ra khi xóa đối tác'

    console.error('deletePartnerSaga error:', error)
    message.error(errorMessage)
  }
}

export function* partnerSaga() {
  yield takeLatest(PARTNER.GET_LIST_PARTNER, getListPartnerSaga)
  yield takeLatest(PARTNER.DELETE_PARTNER, deletePartnerSaga)
}
