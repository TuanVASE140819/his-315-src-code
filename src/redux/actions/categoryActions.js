import { CATEGORY } from '../constants/constants'

export const postInfoCategoryAction = (payload, handleReload) => ({
  type: CATEGORY.POST_INFO_CATEGORY,
  payload,
  handleReload,
})
export const putInfoCategoryAction = (payload, handleReload) => ({
  type: CATEGORY.PUT_INFO_CATEGORY,
  payload,
  handleReload,
})
export const putActiveCategoryAction = (payload) => ({
  type: CATEGORY.PUT_ACTIVE_CATEGORY,
  payload,
})
