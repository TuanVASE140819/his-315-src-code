import { TEAM } from '../constants/constants'

export const postInfoTeamAction = (payload, handleReload) => ({
  type: TEAM.POST_INFO_TEAM,
  payload,
  handleReload,
})
export const putInfoTeamAction = (payload, handleReload) => ({
  type: TEAM.PUT_INFO_TEAM,
  payload,
  handleReload,
})
export const putToggleActiveTeamAction = (payload, onLoadTeam) => ({
  type: TEAM.PUT_TOGGLE_ACTIVE_TEAM,
  payload,
  onLoadTeam,
})
