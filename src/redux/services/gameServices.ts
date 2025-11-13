import axiosInstance from '../../utils/axiosConfig'
import { AxiosResponse } from 'axios'
import { CreateGamePayload, UpdateGamePayload } from '../../types/game.types'

export const gameServices = {
  postInfoGame: (payload: CreateGamePayload): Promise<AxiosResponse> =>
    axiosInstance.post('Game/Admin/AddGame', payload),
  putInfoGame: (payload: UpdateGamePayload): Promise<AxiosResponse> =>
    axiosInstance.put('Game/Admin/UpdateGame', payload),
  putToggleActiveGame: (id: string | number): Promise<AxiosResponse> =>
    axiosInstance.put(`Game/Admin/ToggleActive/${id}`),
  putMatchResultGame: (gameItemId: string | number): Promise<AxiosResponse> =>
    axiosInstance.put(`Game/Admin/UpdateResult?gameItemId=${gameItemId}`),
  getListGameSearch: (
    leagueId?: string | number,
    keyword?: string,
  ): Promise<AxiosResponse> =>
    axiosInstance.get('Game/Admin/GetAllGames', {
      params: { leagueId, keyword },
    }),
  getInfoGameById: (id: string | number): Promise<AxiosResponse> =>
    axiosInstance.get(`Game/Admin/GetGameById/${id}`),
}
