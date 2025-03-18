import axiosInstance from '../../utils/axiosConfig'

export const teamServices = {
  postInfoTeam: (payload) =>
    axiosInstance.post('Team/Admin/AddTeam', payload),
  putInfoTeam: (payload) =>
    axiosInstance.put('Team/Admin/UpdateTeam', payload),
  putActiveTeam: (payload) =>
    axiosInstance.put('Team/Admin/UpdateTeam', payload),
  getListTeamSearch: (categoryId, keyword) =>
    axiosInstance.get('Team/Admin/GetAllTeams', {
      params: { categoryId, keyword },
    }),
  getInfoTeamById: (id) => axiosInstance.get(`Team/Admin/GetTeamById/${id}`),
}
