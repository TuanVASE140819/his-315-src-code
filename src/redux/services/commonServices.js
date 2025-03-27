import axiosInstance from '../../utils/axiosConfig'

export const commonServices = {
  getListCategory: () => axiosInstance.get('Category/Admin/GetListCategory'),
  getListTeam: (categoryId) =>
    axiosInstance.get('Team/Admin/GetListTeam', { params: { categoryId } }),
  getListTransactionType: () =>
    axiosInstance.get('Transaction/GetTransactionType'),
}
