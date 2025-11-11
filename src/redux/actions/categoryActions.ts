import { CATEGORY } from '../constants/constants'
import {
  CreateCategoryPayload,
  UpdateCategoryPayload,
  PostCategoryAction,
  PutCategoryAction,
  ToggleActiveCategoryAction,
} from '../../types'

export const postInfoCategoryAction = (
  payload: CreateCategoryPayload,
  handleReload?: () => void,
): PostCategoryAction => ({
  type: CATEGORY.POST_INFO_CATEGORY,
  payload,
  handleReload,
})

export const putInfoCategoryAction = (
  payload: UpdateCategoryPayload,
  handleReload?: () => void,
): PutCategoryAction => ({
  type: CATEGORY.PUT_INFO_CATEGORY,
  payload,
  handleReload,
})

export const putToggleActiveCategoryAction = (
  payload: { id: number },
  onLoadCategory?: () => void,
): ToggleActiveCategoryAction => ({
  type: CATEGORY.PUT_TOGGLE_ACTIVE_CATEGORY,
  payload,
  onLoadCategory,
})
