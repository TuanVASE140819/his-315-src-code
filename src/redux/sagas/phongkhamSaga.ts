import { call, put, takeLatest } from 'redux-saga/effects'
import { PHONGKHAM, COMMON } from '../constants/constants'
import { phongKhamServices } from '../services/phongkhamServices'
import { message } from 'antd'

function* getListPhongKhamSaga(action: any) {
  try {
    const {
      idKhoaPhong = null,
      pageNumber = 1,
      keyword = '',
      suDung = null,
    } = action.payload || {}
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: true })
    const res: any = yield call(() =>
      phongKhamServices.searchPhongKhamPagined(
        idKhoaPhong,
        pageNumber,
        keyword,
        suDung,
      ),
    )
    if (res?.data?.status === 200 && res?.data?.data) {
      const payload = res.data.data
      const items = (payload.data || []).map((r: any) => ({
        id: r.idpk,
        maPhongKham: r.mapk,
        tenPhongKham: r.tenpk,
        diaChi: r.diachi || '',
        soDienThoai: r.sodienthoai || '',
        email: r.email || '',
        moTa: r.ghichu || '',
        idKhoaPhong: r.idkhoaphong,
        suDung: r.sudung,
        raw: r,
      }))

      yield put({
        type: PHONGKHAM.DISPATCH_LIST_PHONGKHAM,
        payload: {
          data: items,
          totalCount: payload.totalCount || 0,
          totalPages: payload.totalPages || 0,
          pageNumber: payload.pageIndex || pageNumber,
          pageSize: payload.pageSize || 10,
        },
      })
    }
  } catch (error) {
    console.error('getListPhongKhamSaga error', error)
  } finally {
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: false })
  }
}

export function* phongkhamSaga() {
  yield takeLatest(PHONGKHAM.GET_LIST_PHONGKHAM, getListPhongKhamSaga)
  yield takeLatest(PHONGKHAM.POST_INFO_PHONGKHAM, postPhongKhamSaga)
  yield takeLatest(PHONGKHAM.PUT_INFO_PHONGKHAM, putPhongKhamSaga)
}

function* postPhongKhamSaga(action: any) {
  try {
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: true })
    const res: any = yield call(() =>
      phongKhamServices.insertPhongKham(action.payload),
    )
    if (res?.status === 200 || res?.data?.status === 200) {
      message.success('Tạo phòng khám thành công')
      if (typeof action.onDone === 'function') {
        yield call(action.onDone)
      }
    } else {
      message.error(res?.data?.message || 'Tạo phòng khám thất bại')
    }
  } catch (error) {
    console.error('postPhongKhamSaga error', error)
    message.error('Có lỗi khi tạo phòng khám')
  } finally {
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: false })
  }
}

function* putPhongKhamSaga(action: any) {
  try {
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: true })
    const res: any = yield call(() =>
      phongKhamServices.updatePhongKham(action.payload),
    )
    if (res?.status === 200 || res?.data?.status === 200) {
      message.success('Cập nhật phòng khám thành công')
      if (typeof action.onDone === 'function') {
        yield call(action.onDone)
      }
    } else {
      message.error(res?.data?.message || 'Cập nhật phòng khám thất bại')
    }
  } catch (error) {
    console.error('putPhongKhamSaga error', error)
    message.error('Có lỗi khi cập nhật phòng khám')
  } finally {
    yield put({ type: COMMON.DISPATCH_LOADING_SCREEN, payload: false })
  }
}
