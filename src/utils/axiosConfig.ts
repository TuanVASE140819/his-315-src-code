import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import Cookies from 'js-cookie'
import store from '../redux/store/configureStore'
import { logoutUserError } from '../redux/actions/userActions'
import ToastCus from '../components/common/Toast'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<any>) => {
    const { response } = error
    const message = error?.response?.data?.message ?? error?.response?.data
    if (response && response.status === 401) {
      // dispatch logout error action
      // cast through unknown to satisfy store.dispatch type here during migration
      store.dispatch(
        logoutUserError(
          message ?? 'Tài khoản không có quyền thao tác',
        ) as unknown as any,
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
