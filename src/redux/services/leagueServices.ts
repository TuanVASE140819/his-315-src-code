import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'

export const leagueServices = {
  postInfoLeague: (payload: any): Promise<AxiosResponse> =>
    axiosInstance.post('League/Admin/AddLeague', payload),
  putInfoLeague: (payload: any): Promise<AxiosResponse> =>
    axiosInstance.put('League/Admin/UpdateLeague', payload),
  putToggleActiveLeague: (id: string | number): Promise<AxiosResponse> =>
    axiosInstance.put(`League/Admin/ToggleActive/${id}`),
  getListLeagueSearch: (
    categoryId?: string | number,
    keyword?: string,
  ): Promise<AxiosResponse> =>
    axiosInstance.get('League/Admin/GetAllLeagues', {
      params: { categoryId, keyword },
    }),
  getInfoLeagueById: (id: string | number): Promise<AxiosResponse> =>
    axiosInstance.get(`League/Admin/GetLeagueById/${id}`),
}
