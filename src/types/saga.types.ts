import { NavigateFunction } from 'react-router-dom'
import { FormikHelpers } from 'formik'
import type { SagaIterator } from '@redux-saga/core'

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

// Generic saga action wrapper used by sagas
export interface SagaAction<T = any> {
  type: string
  payload?: T
  [key: string]: any
}

export type SagaGen = SagaIterator

// Temporary alias for action type casts during incremental migration.
// Replace 'as SagaActionType' with proper action types later.
export type SagaActionType = any
