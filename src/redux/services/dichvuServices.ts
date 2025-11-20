import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'

export const dichvuServices = {
  insertDichVu: (payload: any): Promise<AxiosResponse<any>> =>
    axiosInstance.post('/DichVu/InsertDichVu', payload),
  updateDichVu: (payload: any): Promise<AxiosResponse<any>> =>
    axiosInstance.put('/DichVu/UpdateDichVu', payload),
  searchDichVuPaged: (
    idNhomDv: number | null | undefined,
    pageNumber = 1,
    keyword = '',
  ): Promise<AxiosResponse<any>> => {
    const base = '/DichVu/SearchDichVuPhanTrang'
    const groupParam = idNhomDv == null ? '' : `idNhomDv=${idNhomDv}&`
    const url = `${base}?${groupParam}pageNumber=${pageNumber}${keyword ? `&keyword=${encodeURIComponent(keyword)}` : ''}`
    return axiosInstance.get(url)
  },
}

export default dichvuServices
