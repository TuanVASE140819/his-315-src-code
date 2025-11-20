import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'

export const phongKhamServices = {
  searchPhongKhamPagined: (
    idKhoaPhong?: number | null,
    pageNumber = 1,
    keyword = '',
    suDung?: number | null,
  ): Promise<AxiosResponse<any>> => {
    const params: any = { pageNumber }
    if (idKhoaPhong != null) params.idKhoaPhong = idKhoaPhong
    if (keyword) params.keyword = keyword
    if (suDung != null) params.suDung = suDung
    return axiosInstance.get('/PhongKham/SearchPhongKhamPhanTrang', { params })
  },
  insertPhongKham: (payload: any) =>
    axiosInstance.post('/PhongKham/InsertPhongKham', payload),
  updatePhongKham: (payload: any) =>
    axiosInstance.put('/PhongKham/UpdatePhongKham', payload),
}

export default phongKhamServices
