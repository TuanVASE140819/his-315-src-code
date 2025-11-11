import { TEAM } from '../constants/constants'
import {
  CreateTeamPayload,
  UpdateTeamPayload,
  PostTeamAction,
  PutTeamAction,
  ToggleActiveTeamAction,
} from '../../types'

export const postInfoTeamAction = (
  payload: CreateTeamPayload,
  handleReload?: () => void,
): PostTeamAction => ({
  type: TEAM.POST_INFO_TEAM,
  payload,
  handleReload,
})

export const putInfoTeamAction = (
  payload: UpdateTeamPayload,
  handleReload?: () => void,
): PutTeamAction => ({
  type: TEAM.PUT_INFO_TEAM,
  payload,
  handleReload,
})

export const putToggleActiveTeamAction = (
  payload: { id: number },
  onLoadTeam?: () => void,
): ToggleActiveTeamAction => ({
  type: TEAM.PUT_TOGGLE_ACTIVE_TEAM,
  payload,
  onLoadTeam,
})
