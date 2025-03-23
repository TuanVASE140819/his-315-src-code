import { COMMON } from '../constants/constants'

export const getListCategoryAction = () => ({
  type: COMMON.GET_LIST_CATEGORY,
})
export const getListTeamAction = (categoryId) => ({
  type: COMMON.GET_LIST_TEAM,
  categoryId,
})
