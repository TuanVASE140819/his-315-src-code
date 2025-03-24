import { LEAGUE } from '../constants/constants'

export const postInfoLeagueAction = (payload, handleReload) => ({
  type: LEAGUE.POST_INFO_LEAGUE,
  payload,
  handleReload,
})
export const putInfoLeagueAction = (payload, handleReload) => ({
  type: LEAGUE.PUT_INFO_LEAGUE,
  payload,
  handleReload,
})
export const putToggleActiveLeagueAction = (payload, onLoadLeague) => ({
  type: LEAGUE.PUT_TOGGLE_ACTIVE_LEAGUE,
  payload,
  onLoadLeague,
})
