import { CUSTOMER } from '../constants/constants'
import { ToggleActiveCustomerAction } from '../../types'

export const putToggleActiveCustomerAction = (
  payload: { id: number },
  onLoad?: () => void,
): ToggleActiveCustomerAction => ({
  type: CUSTOMER.PUT_TOGGLE_ACTIVE_CUSTOMER,
  payload,
  onLoad,
})
