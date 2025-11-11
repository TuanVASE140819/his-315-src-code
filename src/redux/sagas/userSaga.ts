import { call, put, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import { COMMON, USER } from '../constants/constants'
import { userServices } from '../services/userServices'
import ToastCus from '../../components/common/Toast'
import Cookies from 'js-cookie'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { LogoutUserErrorAction } from '../../types/saga.types'

dayjs.extend(utc)

function* resetInfoUser(): SagaIterator {
  yield call(() => Cookies.remove('accessToken'))
  // Clear all localStorage including menu state, tabs and user info
  yield call(() => {
    localStorage.removeItem('infoUser')
    localStorage.removeItem('app:menuSelectedKeys')
    localStorage.removeItem('app:menuOpenKeys')
    localStorage.removeItem('app:siderCollapsed')
    localStorage.removeItem('app:openTabs')
    localStorage.removeItem('app:activeTab')
    localStorage.removeItem('loginFirstTime')
    // Clear any other app-specific data
    localStorage.clear()
  })
  yield put({
    type: COMMON.DISPATCH_RESET_STORE,
  })
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: false,
  })
}

function* logoutUserError({ error }: LogoutUserErrorAction): SagaIterator {
  try {
    yield call(resetInfoUser)
    ToastCus.fire({
      icon: 'error',
      title: error ?? 'Vui lòng đăng nhập lại',
    })
  } catch (err: any) {
    console.log('logoutUserError : ', err)
    ToastCus.fire({
      icon: 'error',
      title: err?.response?.data?.message || 'Cưỡng chế đăng xuất thất bại',
    })
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}

function* loginUser({
  payload,
  navigate,
  action,
}: import('../../types').LoginAction): import('../../types/saga.types').SagaGen {
  yield put({
    type: COMMON.DISPATCH_LOADING_SCREEN,
    payload: true,
  })
  try {
    // Call real login API
    const response = yield call(() => userServices.login(payload))
    const { data: apiResponse } = response

    if (!apiResponse?.data?.token) {
      return ToastCus.fire({
        icon: 'error',
        title: apiResponse?.message || 'Đăng nhập thất bại',
      })
    }

    const loginData = apiResponse.data

    // Save token to cookies
    yield call(() => {
      const getExpirationDateForToday = () => {
        return dayjs().utc().endOf('day').toDate()
      }
      const expires = getExpirationDateForToday()
      Cookies.set('accessToken', loginData.token, {
        expires,
      })
    })

    // Transform API response to User format
    const userInfo = {
      id: loginData.dangNhap?.idNguoiDung || 0,
      email: loginData.taiKhoan,
      username: loginData.taiKhoan,
      fullName: loginData.tenNhanVien,
      isAdmin: loginData.tenNhom === 'Administrator',
      role: loginData.tenNhom,
      idNv: loginData.idNv,
      tenNhanVien: loginData.tenNhanVien,
      tenNhom: loginData.tenNhom,
    }

    yield put({
      type: USER.DISPATCH_INFO_LOGIN,
      payload: userInfo,
    })

    // Persist user info to localStorage so page refresh retains it
    yield call(() => localStorage.setItem('infoUser', JSON.stringify(userInfo)))
    yield call(() => localStorage.setItem('loginFirstTime', 'true'))
    // navigate is not an effect - wrap in call to keep saga typing consistent
    yield call(() => navigate && navigate('/'))
    // action.resetForm is a plain function; call it inside an effect to avoid yielding void
    yield call(() => action && action.resetForm && action.resetForm())

    ToastCus.fire({
      icon: 'success',
      title: apiResponse?.message || 'Đăng nhập thành công',
    })
  } catch (error: any) {
    console.log('loginUser error: ', error)
    ToastCus.fire({
      icon: 'error',
      title: (error as any)?.response?.data?.message || 'Đăng nhập thất bại',
    })
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}

function* getInfoUser(): SagaIterator {
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
    console.log('getInfoUser : ', error)
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}

function* logoutUser({
  navigate,
}: import('../../types').LogoutAction): import('../../types/saga.types').SagaGen {
  try {
    yield call(resetInfoUser)
    // wrap navigation in call to make it a proper effect
    yield call(() => navigate && navigate('/login'))
    ToastCus.fire({
      icon: 'success',
      title: 'Đăng xuất thành công',
    })
  } catch (error: any) {
    console.log('logoutUser : ', error)
    ToastCus.fire({
      icon: 'error',
      title: (error as any)?.response?.data?.message ?? 'Đăng xuất thất bại',
    })
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}

function* putChangePasswordSaga({
  payload,
  handleReload,
}: import('../../types').ChangePasswordAction): import('../../types/saga.types').SagaGen {
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
    // handleReload is an optional callback; call directly if provided
    if (handleReload) handleReload()
    ToastCus.fire({
      icon: 'success',
      title: 'Đổi mật khẩu thành công',
    })
  } catch (error) {
    console.log('putChangePasswordSaga : ', error)
  } finally {
    yield put({
      type: COMMON.DISPATCH_LOADING_SCREEN,
      payload: false,
    })
  }
}

function* getCompaniesForUserSaga({
  payload,
}: import('../../types').GetCompaniesForUserAction): import('../../types/saga.types').SagaGen {
  try {
    const { data } = yield call(() => userServices.getCompaniesForUser(payload))
    const list = data?.data ?? []
    yield put({
      type: USER.DISPATCH_COMPANIES_FOR_USER,
      payload: list,
    })
  } catch (error) {
    console.log('getCompaniesForUserSaga : ', error)
    yield put({
      type: USER.DISPATCH_COMPANIES_FOR_USER,
      payload: [],
    })
  }
}

function* getDepartmentsForUserSaga({
  payload,
}: import('../../types').GetDepartmentsForUserAction): import('../../types/saga.types').SagaGen {
  try {
    const { taiKhoan, idCongTy } = payload
    const { data } = yield call(() =>
      userServices.getDepartmentsForUser(taiKhoan, idCongTy),
    )
    const list = data?.data ?? []
    yield put({
      type: USER.DISPATCH_DEPARTMENTS_FOR_USER,
      payload: list,
    })
  } catch (error) {
    console.log('getDepartmentsForUserSaga : ', error)
    yield put({
      type: USER.DISPATCH_DEPARTMENTS_FOR_USER,
      payload: [],
    })
  }
}

export function* userSaga(): SagaIterator {
  yield takeLatest(USER.GET_LOGIN_API, loginUser)
  yield takeLatest(USER.LOGOUT_USER, logoutUser)
  yield takeLatest(USER.LOGOUT_USER_ERROR, logoutUserError)
  yield takeLatest(USER.UPDATE_INFO_USER_ACCESS_TOKEN, getInfoUser)
  yield takeLatest(USER.PUT_CHANGE_PASSWORD, putChangePasswordSaga)
  yield takeLatest(USER.GET_COMPANIES_FOR_USER, getCompaniesForUserSaga)
  yield takeLatest(USER.GET_DEPARTMENTS_FOR_USER, getDepartmentsForUserSaga)
}
