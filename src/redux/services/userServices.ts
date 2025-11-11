import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'
import {
  LoginCredentials,
  ChangePasswordPayload,
  User,
  LoginResponse,
  ApiResponse,
} from '../../types'

export const userServices = {
  login: (
    payload: LoginCredentials,
  ): Promise<AxiosResponse<ApiResponse<LoginResponse>>> =>
    axiosInstance.post('Auth/login', payload),
  getInfoUser: (): Promise<AxiosResponse<ApiResponse<User>>> =>
    axiosInstance.get('User/Admin/information'),
  postChangePassword: (
    payload: ChangePasswordPayload,
  ): Promise<AxiosResponse<ApiResponse>> =>
    axiosInstance.post('User/Admin/ChangePassword', payload),
  getCompaniesForUser: (
    taiKhoan: string,
  ): Promise<AxiosResponse<ApiResponse<any>>> =>
    axiosInstance.get(
      `/NguoiDungKhoaPhong/GetCongTyForNguoiDungByTaiKhoan?taiKhoan=${taiKhoan}`,
    ),
  getDepartmentsForUser: (
    taiKhoan: string,
    idCongTy: string | number,
  ): Promise<AxiosResponse<ApiResponse<any>>> =>
    axiosInstance.get(
      `/NguoiDungKhoaPhong/GetKhoaPhongForNguoiDungByTaiKhoan?taiKhoan=${taiKhoan}&idCongTy=${idCongTy}`,
    ),
}
