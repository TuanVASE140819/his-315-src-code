import { GAME } from '../constants/constants'

export const postInfoGameAction = (payload, handleReloadAddGame) => ({
  type: GAME.POST_INFO_GAME,
  payload,
  handleReloadAddGame,
})
export const putInfoGameAction = (payload, handleReload) => ({
  type: GAME.PUT_INFO_GAME,
  payload,
  handleReload,
})
export const putToggleActiveGameAction = (payload, onLoadGame) => ({
  type: GAME.PUT_TOGGLE_ACTIVE_GAME,
  payload,
  onLoadGame,
})
export const putMatchResultGameAction = (payload, onLoadGame) => ({
  type: GAME.PUT_MATCH_RESULT_GAME,
  payload,
  onLoadGame,
})
