import { CUSTOMER } from '../constants/constants'

export const putToggleActiveCustomerAction = (payload, onLoad) => ({
  type: CUSTOMER.PUT_TOGGLE_ACTIVE_CUSTOMER,
  payload,
  onLoad,
})
