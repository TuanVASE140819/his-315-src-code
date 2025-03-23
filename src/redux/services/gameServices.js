import axiosInstance from '../../utils/axiosConfig'

export const gameServices = {
  postInfoGame: (payload) =>
    axiosInstance.post('Game/Admin/AddGame', payload),
  putInfoGame: (payload) =>
    axiosInstance.put('Game/Admin/UpdateGame', payload),
  putActiveGame: (id) =>
    axiosInstance.put(`Game/Admin/ToggleActive/${id}`),
  getListGameSearch: (keyword) =>
    axiosInstance.get('Game/Admin/GetAllGames', {
      params: { keyword },
    }),
  getInfoGameById: (id) =>
    axiosInstance.get(`Game/Admin/GetGameById/${id}`),
}
