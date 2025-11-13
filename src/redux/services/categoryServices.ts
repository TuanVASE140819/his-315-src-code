import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'
import { CreateCategoryPayload, UpdateCategoryPayload } from '../../types/category.types'

export const categoryServices = {
  postInfoCategory: (payload: CreateCategoryPayload): Promise<AxiosResponse> =>
    axiosInstance.post('Category/Admin/AddCategory', payload),
  putInfoCategory: (payload: UpdateCategoryPayload): Promise<AxiosResponse> =>
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
