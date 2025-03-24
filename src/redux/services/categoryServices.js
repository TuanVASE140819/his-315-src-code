import axiosInstance from '../../utils/axiosConfig'

export const categoryServices = {
  postInfoCategory: (payload) =>
    axiosInstance.post('Category/Admin/AddCategory', payload),
  putInfoCategory: (payload) =>
    axiosInstance.put('Category/Admin/UpdateCategory', payload),
  putToggleActiveCategory: (id) =>
    axiosInstance.put(`Category/Admin/ToggleActive/${id}`),
  getListCategorySearch: (keyword) =>
    axiosInstance.get('Category/Admin/GetAllCategorys', {
      params: { keyword },
    }),
  getInfoCategoryById: (id) =>
    axiosInstance.get(`Category/Admin/GetCategoryById/${id}`),
}
