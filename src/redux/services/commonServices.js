import axiosInstance from '../../utils/axiosConfig'

export const commonServices = {
  getListCategory: () => axiosInstance.get('Category/Admin/GetListCategory'),
}
