import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'
import { CreateTeamPayload, UpdateTeamPayload } from '../../types/team.types'

export const teamServices = {
  postInfoTeam: (payload: CreateTeamPayload): Promise<AxiosResponse> =>
    axiosInstance.post('Team/Admin/AddTeam', payload),
  putInfoTeam: (payload: UpdateTeamPayload): Promise<AxiosResponse> =>
    axiosInstance.put('Team/Admin/UpdateTeam', payload),
  putToggleActiveTeam: (id: string | number): Promise<AxiosResponse> =>
    axiosInstance.put(`Team/Admin/ToggleActive/${id}`),
  getListTeamSearch: (
    categoryId?: string | number,
    keyword?: string,
  ): Promise<AxiosResponse> =>
    axiosInstance.get('Team/Admin/GetAllTeams', {
      params: { categoryId, keyword },
    }),
  getInfoTeamById: (id: string | number): Promise<AxiosResponse> =>
    axiosInstance.get(`Team/Admin/GetTeamById/${id}`),
}
