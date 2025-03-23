import { GAME } from '../constants/constants'

export const postInfoGameAction = (payload, handleReloadGame) => ({
  type: GAME.POST_INFO_GAME,
  payload,
  handleReloadGame,
})
export const putInfoGameAction = (payload, handleReload) => ({
  type: GAME.PUT_INFO_GAME,
  payload,
  handleReload,
})
export const putActiveGameAction = (payload, onLoadGame) => ({
  type: GAME.PUT_ACTIVE_GAME,
  payload,
  onLoadGame,
})
