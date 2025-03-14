import axiosInstance from '../../utils/axiosConfig'

export const userServices = {
  login: (payload) => axiosInstance.post('Auth/login', payload),
  getInfoUser: () => axiosInstance.get('User/Admin/information'),
  postChangePassword: (payload) =>
    axiosInstance.post('User/Admin/ChangePassword', payload),
  // getInfoUserByEmail: (email) =>
  //   axiosInstance.get('User/Client/profile', { params: { email } }),
  // getIdNguoiDungByTenTk: (username) =>
  //   axiosInstance.get(`NguoiDung/id/${username}`),
  // getInfoNguoiDungById: (idNguoiDung) =>
  //   axiosInstance.get('NguoiDung/GetNGuoiDungByID', {
  //     params: { idNguoiDung },
  //   }),
}
