import { LEAGUE } from '../constants/constants'
import {
  CreateLeaguePayload,
  UpdateLeaguePayload,
  PostLeagueAction,
  PutLeagueAction,
  ToggleActiveLeagueAction,
} from '../../types'

export const postInfoLeagueAction = (
  payload: CreateLeaguePayload,
  handleReload?: () => void,
): PostLeagueAction => ({
  type: LEAGUE.POST_INFO_LEAGUE,
  payload,
  handleReload,
})

export const putInfoLeagueAction = (
  payload: UpdateLeaguePayload,
  handleReload?: () => void,
): PutLeagueAction => ({
  type: LEAGUE.PUT_INFO_LEAGUE,
  payload,
  handleReload,
})

export const putToggleActiveLeagueAction = (
  payload: { id: number },
  onLoadLeague?: () => void,
): ToggleActiveLeagueAction => ({
  type: LEAGUE.PUT_TOGGLE_ACTIVE_LEAGUE,
  payload,
  onLoadLeague,
})
