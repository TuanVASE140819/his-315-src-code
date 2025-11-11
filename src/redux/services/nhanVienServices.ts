import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'

export const nhanVienServices = {
  searchNhanVien: (keyword = '', pageIndex = 1): Promise<AxiosResponse<any>> =>
    axiosInstance.get(
      `/NhanVien/SearchNhanVienPhanTrang?keyword=${encodeURIComponent(keyword)}&pageIndex=${pageIndex}`,
    ),
}
