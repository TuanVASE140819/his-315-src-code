import { call, put, takeLatest } from 'redux-saga/effects'
import { COMMON, USER } from '../constants/constants'
import { userServices } from '../services/userServices'
import ToastCus from '../../components/common/Toast'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function* resetInfoUser() {
  yield Cookies.remove('accessToken')
  yield localStorage.clear()
  yield put({
    type: COMMON.DISPATCH_RESET_STORE,
  })
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: false,
  })
}

function* logoutUserError({ error }) {
  try {
    yield resetInfoUser()
    ToastCus.fire({
      icon: 'error',
      title: error ?? 'Vui lòng đăng nhập lại',
    })
  } catch (error) {
    console.log(error)
    ToastCus.fire({
      icon: 'error',
      title: error?.response?.data?.message || 'Cưỡng chế đăng xuất thất bại',
    })
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}

function* loginUser({ payload, navigate, action }) {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    const { data } = yield call(() => userServices.login(payload))
    if (!data?.accessToken || !data.refreshToken) {
      return ToastCus.fire({
        icon: 'error',
        title: 'Đăng nhập thất bại',
      })
    }
    yield call(() => {
      const getExpirationDateForToday = () => {
        return dayjs().utc().endOf('day').toDate() // Lấy thời điểm 23:59:59 UTC của ngày hiện tại
      }
      const expires = getExpirationDateForToday()
      Cookies.set('accessToken', data?.accessToken, {
        expires,
        // secure: true,
        // sameSite: 'Strict',
      })
    })
    const { data: infoUser } = yield call(() => userServices.getInfoUser())
    if (!infoUser || !infoUser?.isAdmin) {
      yield logoutUserError({ error: 'Tài khoản không có quyền truy cập' })
      yield navigate('/login')
      return
    }
    yield put({
      type: USER.DISPATCH_INFO_LOGIN,
      payload: infoUser,
    })
    yield localStorage.setItem('loginFirstTime', true)
    yield navigate('/')
    yield action.resetForm()
    ToastCus.fire({
      icon: 'success',
      title: 'Đăng nhập thành công',
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

function* getInfoUser() {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    const { data } = yield call(() => userServices.getInfoUser())
    yield put({
      type: USER.DISPATCH_INFO_LOGIN,
      payload: data,
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

function* logoutUser({ navigate }) {
  try {
    yield resetInfoUser()
    yield navigate('/login')
    ToastCus.fire({
      icon: 'success',
      title: 'Đăng xuất thành công',
    })
  } catch (error) {
    console.log(error)
    ToastCus.fire({
      icon: 'error',
      title: error?.response?.data?.message ?? 'Đăng xuất thất bại',
    })
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}

function* putChangePasswordSaga({ payload, handleReload }) {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    yield call(() =>
      userServices.postChangePassword({
        oldPassword: payload?.oldPassword,
        newPassword: payload?.newPassword,
      }),
    )
    yield handleReload()
    ToastCus.fire({
      icon: 'success',
      title: 'Đổi mật khẩu thành công',
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

export function* userSaga() {
  yield takeLatest(USER.GET_LOGIN_API, loginUser)
  yield takeLatest(USER.LOGOUT_USER, logoutUser)
  yield takeLatest(USER.LOGOUT_USER_ERROR, logoutUserError)
  yield takeLatest(USER.UPDATE_INFO_USER_ACCESS_TOKEN, getInfoUser)
  yield takeLatest(USER.PUT_CHANGE_PASSWORD, putChangePasswordSaga)
}
