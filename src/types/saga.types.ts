import { NavigateFunction } from 'react-router-dom'
import { FormikHelpers } from 'formik'

// Saga action payload types
export interface LoginUserAction {
  type: string
  payload: any
  navigate: NavigateFunction
  action: FormikHelpers<any>
}

export interface LogoutUserAction {
  type: string
  navigate: NavigateFunction
}

export interface LogoutUserErrorAction {
  type: string
  error: string
}

export interface GetCompaniesForUserAction {
  type: string
  payload: string // taiKhoan
}

export interface GetDepartmentsForUserAction {
  type: string
  payload: {
    taiKhoan: string
    idCongTy: number
  }
}

export interface PutChangePasswordAction {
  type: string
  payload: any
  handleReload: () => void
}
