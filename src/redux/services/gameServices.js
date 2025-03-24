import axiosInstance from '../../utils/axiosConfig'

export const gameServices = {
  postInfoGame: (payload) => axiosInstance.post('Game/Admin/AddGame', payload),
  putInfoGame: (payload) => axiosInstance.put('Game/Admin/UpdateGame', payload),
  putToggleActiveGame: (id) =>
    axiosInstance.put(`Game/Admin/ToggleActive/${id}`),
  putMatchResultGame: (id) =>
    axiosInstance.put(`Game/Admin/ToggleActive/${id}`),
  getListGameSearch: (leagueId, keyword) =>
    axiosInstance.get('Game/Admin/GetAllGames', {
      params: { leagueId, keyword },
    }),
  getInfoGameById: (id) => axiosInstance.get(`Game/Admin/GetGameById/${id}`),
}
