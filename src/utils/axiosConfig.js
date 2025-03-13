import axios from 'axios'
import Cookies from 'js-cookie'
import store from '../redux/store/configureStore'
import { logoutUserError } from '../redux/actions/userActions'
import ToastCus from '../components/common/Toast'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error
    const { message } = error?.response?.data
    if (response && response.status === 401) {
      // Cookies.remove('accessToken')
      store.dispatch(
        logoutUserError(message ?? 'Tài khoản không có quyền thao tác'),
      )
    } else {
      ToastCus.fire({
        icon: 'error',
        title: message ?? 'Thao tác thất bại',
      })
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
