import { GAME } from '../constants/constants'
import {
  CreateGameBatchPayload,
  UpdateGamePayload,
  UpdateGameResultPayload,
  PostGameAction,
  PutGameAction,
  ToggleActiveGameAction,
  UpdateGameResultAction,
} from '../../types'

export const postInfoGameAction = (
  payload: CreateGameBatchPayload,
  handleReloadAddGame?: () => void,
): PostGameAction => ({
  type: GAME.POST_INFO_GAME,
  payload,
  handleReloadAddGame,
})

export const putInfoGameAction = (
  payload: UpdateGamePayload,
  handleCloseEditGame?: () => void,
): PutGameAction => ({
  type: GAME.PUT_INFO_GAME,
  payload,
  handleCloseEditGame,
})

export const putToggleActiveGameAction = (
  payload: { id: number },
  onLoadGame?: () => void,
): ToggleActiveGameAction => ({
  type: GAME.PUT_TOGGLE_ACTIVE_GAME,
  payload,
  onLoadGame,
})

export const putMatchResultGameAction = (
  payload: UpdateGameResultPayload,
  onLoadGame?: () => void,
): UpdateGameResultAction => ({
  type: GAME.PUT_MATCH_RESULT_GAME,
  payload,
  onLoadGame,
})
