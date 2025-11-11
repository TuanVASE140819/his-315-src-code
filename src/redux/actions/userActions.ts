import { NavigateFunction } from 'react-router-dom'
import { USER } from '../constants/constants'
import {
  LoginCredentials,
  ChangePasswordPayload,
  LoginAction,
  LogoutAction,
  LogoutErrorAction,
  UpdateInfoUserAction,
  ChangePasswordAction,
} from '../../types'

export const loginUser = (
  payload: LoginCredentials,
  navigate: NavigateFunction,
  action?: any,
): LoginAction => ({
  type: USER.GET_LOGIN_API,
  payload,
  navigate,
  action,
})

export const logoutUser = (navigate: NavigateFunction): LogoutAction => ({
  type: USER.LOGOUT_USER,
  navigate,
})

export const logoutUserError = (error: any): LogoutErrorAction => ({
  type: USER.LOGOUT_USER_ERROR,
  error,
})

export const updateInfoUserToStore = (): UpdateInfoUserAction => ({
  type: USER.UPDATE_INFO_USER_ACCESS_TOKEN,
})

export const putChangePasswordAction = (
  payload: ChangePasswordPayload,
  handleReload?: () => void,
): ChangePasswordAction => ({
  type: USER.PUT_CHANGE_PASSWORD,
  payload,
  handleReload,
})

export const getCompaniesForUser = (taiKhoan: string) => ({
  type: USER.GET_COMPANIES_FOR_USER,
  payload: taiKhoan,
})

export const getDepartmentsForUser = (
  taiKhoan: string,
  idCongTy: string | number,
) => ({
  type: USER.GET_DEPARTMENTS_FOR_USER,
  payload: { taiKhoan, idCongTy },
})
