import axiosInstance from '../../utils/axiosConfig'

export const leagueServices = {
  postInfoLeague: (payload) =>
    axiosInstance.post('League/Admin/AddLeague', payload),
  putInfoLeague: (payload) =>
    axiosInstance.put('League/Admin/UpdateLeague', payload),
  putActiveLeague: (id) => axiosInstance.put(`League/Admin/ToggleActive/${id}`),
  getListLeagueSearch: (categoryId, keyword) =>
    axiosInstance.get('League/Admin/GetAllLeagues', {
      params: { categoryId, keyword },
    }),
  getInfoLeagueById: (id) =>
    axiosInstance.get(`League/Admin/GetLeagueById/${id}`),
}
