import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'
import { Category, Team, TransactionTypeOption, ApiResponse } from '../../types'

export const commonServices = {
  getListCategory: (): Promise<AxiosResponse<ApiResponse<Category[]>>> =>
    axiosInstance.get('Category/Admin/GetListCategory'),
  getListTeam: (
    categoryId?: string | number,
  ): Promise<AxiosResponse<ApiResponse<Team[]>>> =>
    axiosInstance.get('Team/Admin/GetListTeam', { params: { categoryId } }),
  getListTransactionType: (): Promise<
    AxiosResponse<ApiResponse<TransactionTypeOption[]>>
  > => axiosInstance.get('Transaction/GetTransactionType'),
}
