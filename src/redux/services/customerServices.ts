import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'

export const customerServices = {
  getListCustomer: (
    keyword?: string,
    pageNumber?: number,
    pageSize?: number,
  ): Promise<AxiosResponse> =>
    axiosInstance.get('User/Admin/GetAllClient', {
      params: { keyword, pageNumber, pageSize },
    }),
  getListTransactionHistory: (
    userId?: string | number,
    transactionType?: string | number,
    fromDate?: string,
    toDate?: string,
    pageNumber?: number,
    pageSize?: number,
  ): Promise<AxiosResponse> =>
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
  putToggleActiveCustomer: (id: string | number): Promise<AxiosResponse> =>
    axiosInstance.put(`User/Admin/ToggleActive/${id}`),
}
