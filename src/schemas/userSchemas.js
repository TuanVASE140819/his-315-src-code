import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('Vui lòng nhập email của bạn'),
  password: Yup.string().required('Vui lòng nhập mật khẩu'),
})
export const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Vui lòng nhập mật khẩu hiện tại'),
  newPassword: Yup.string().required('Vui lòng nhập mật khẩu mới'),
  confirmNewPassword: Yup.string().required('Vui lòng nhập xác nhận mật khẩu mới'),
})
