import { CATEGORY } from '../constants/constants'

export const postInfoCategoryAction = (payload, handleReload) => ({
  type: CATEGORY.POST_INFO_CATEGORY,
  payload,
  handleReload,
})
