import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'

export const dichvuServices = {
  insertDichVu: (payload: any): Promise<AxiosResponse<any>> =>
    axiosInstance.post('/DichVu/InsertDichVu', payload),
  updateDichVu: (payload: any): Promise<AxiosResponse<any>> =>
    axiosInstance.put('/DichVu/UpdateDichVu', payload),
}

export default dichvuServices
