import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'

export const categoryServices = {
  postInfoCategory: (payload: any): Promise<AxiosResponse> =>
    axiosInstance.post('Category/Admin/AddCategory', payload),
  putInfoCategory: (payload: any): Promise<AxiosResponse> =>
    axiosInstance.put('Category/Admin/UpdateCategory', payload),
  putToggleActiveCategory: (id: string | number): Promise<AxiosResponse> =>
    axiosInstance.put(`Category/Admin/ToggleActive/${id}`),
  getListCategorySearch: (keyword?: string): Promise<AxiosResponse> =>
    axiosInstance.get('Category/Admin/GetAllCategorys', {
      params: { keyword },
    }),
  getInfoCategoryById: (id: string | number): Promise<AxiosResponse> =>
    axiosInstance.get(`Category/Admin/GetCategoryById/${id}`),
}
