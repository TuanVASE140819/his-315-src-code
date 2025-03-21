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
export const putActiveLeagueAction = (payload, onLoadLeague) => ({
  type: LEAGUE.PUT_ACTIVE_LEAGUE,
  payload,
  onLoadLeague,
})
