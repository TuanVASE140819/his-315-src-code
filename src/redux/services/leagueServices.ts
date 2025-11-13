import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'
import {
  CreateLeaguePayload,
  UpdateLeaguePayload,
} from '../../types/league.types'

export const leagueServices = {
  postInfoLeague: (payload: CreateLeaguePayload): Promise<AxiosResponse> =>
    axiosInstance.post('League/Admin/AddLeague', payload),
  putInfoLeague: (payload: UpdateLeaguePayload): Promise<AxiosResponse> =>
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
