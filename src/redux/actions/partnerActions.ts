import { PARTNER } from '../constants/constants'

export const getListPartnerAction = (payload = { keyword: '', pageNumber: 1 }) => ({
  type: PARTNER.GET_LIST_PARTNER,
  payload,
})

export const dispatchListPartnerAction = (payload) => ({
  type: PARTNER.DISPATCH_LIST_PARTNER,
  payload,
})

export const deletePartnerAction = (id, onDone) => ({
  type: PARTNER.DELETE_PARTNER,
  payload: id,
  onDone,
})
