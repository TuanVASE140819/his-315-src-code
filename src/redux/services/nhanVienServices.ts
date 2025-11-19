import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'
import { CreateNhanVienPayload } from '../../types/nhanVien.types'

export const nhanVienServices = {
  searchNhanVien: (keyword = '', pageIndex = 1): Promise<AxiosResponse<any>> =>
    axiosInstance.get(
      `/NhanVien/SearchNhanVienPhanTrang?keyword=${encodeURIComponent(keyword)}&pageIndex=${pageIndex}`,
    ),
  postInfoNhanVien: (payload: CreateNhanVienPayload): Promise<AxiosResponse> =>
    axiosInstance.post('/NhanVien/InsertNhanVien', payload),
  putInfoNhanVien: (payload: CreateNhanVienPayload): Promise<AxiosResponse> =>
    axiosInstance.put('/NhanVien/UpdateNhanVien', payload),
}
