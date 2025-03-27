import axiosInstance from '../../utils/axiosConfig'

export const customerServices = {
  getListCustomer: (keyword, pageNumber, pageSize) =>
    axiosInstance.get('User/Admin/GetAllClient', {
      params: { keyword, pageNumber, pageSize },
    }),
  getListTransactionHistory: (
    userId,
    transactionType,
    fromDate,
    toDate,
    pageNumber,
    pageSize,
  ) =>
    axiosInstance.get('Transaction/Admin/GetTransactionHistory', {
      params: {
        userId,
        transactionType,
        fromDate,
        toDate,
        pageNumber,
        pageSize,
      },
    }),
  putToggleActiveCustomer: (id) =>
    axiosInstance.put(`User/Admin/ToggleActive/${id}`),
}
