import axiosInstance from '../../utils/axiosConfig'

export const categoryServices = {
  postInfoCategory: (payload) =>
    axiosInstance.post('Category/Admin/AddCategory', payload),
  putInfoCategory: (payload) =>
    axiosInstance.put('Category/Admin/UpdateCategory', payload),
  putActiveCategory: (payload) =>
    axiosInstance.put('Category/Admin/UpdateCategory', payload),
  getListCategorySearch: (keyword) =>
    axiosInstance.get('Category/Admin/GetAllCategorys', {
      params: { keyword },
    }),
  getInfoCategoryById: (id) =>
    axiosInstance.get(`Category/Admin/GetCategoryById/${id}`),
}
