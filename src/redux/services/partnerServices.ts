import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'

export const partnerServices = {
  searchPartnerPaged: (
    keyword = '',
    pageNumber = 1,
  ): Promise<AxiosResponse<any>> =>
    axiosInstance.get(
      `/DoiTac/SearchDoiTacPhanTrang?keyword=${encodeURIComponent(keyword)}&pageNumber=${pageNumber}`,
    ),
  deletePartnerById: (id: number): Promise<AxiosResponse<any>> =>
    axiosInstance.delete(`/DoiTac/DeleteDoiTac?id=${id}`),
  getAllDoiTac: (): Promise<AxiosResponse<any>> =>
    axiosInstance.get('/DoiTac/GetAllDoiTac'),
}
