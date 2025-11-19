import { DICHVU } from '../constants/constants'

export const postInfoDichVuAction = (payload: any, onDone?: () => void) => ({
  type: DICHVU.POST_INFO_DICHVU,
  payload,
  onDone,
})

export const putInfoDichVuAction = (payload: any, onDone?: () => void) => ({
  type: DICHVU.PUT_INFO_DICHVU,
  payload,
  onDone,
})

export const dispatchUpdateDichVuAction = (payload: any) => ({
  type: DICHVU.DISPATCH_UPDATE_DICHVU,
  payload,
})
