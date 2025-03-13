import { USER } from '../constants/constants'

export const loginUser = (payload, navigate, action) => ({
  type: USER.GET_LOGIN_API,
  payload,
  navigate,
  action,
})

export const logoutUser = (navigate) => ({
  type: USER.LOGOUT_USER,
  navigate,
})

export const logoutUserError = (error) => ({
  type: USER.LOGOUT_USER_ERROR,
  error,
})

export const updateInfoUserToStore = () => ({
  type: USER.UPDATE_INFO_USER_ACCESS_TOKEN,
})

export const putChangePasswordAction = (payload, handleReload) => ({
  type: USER.PUT_CHANGE_PASSWORD,
  payload,
  handleReload,
})
