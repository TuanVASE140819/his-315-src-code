import { PHONGKHAM } from '../constants/constants'

const initialPhongKhamState = {
  list: [] as any[],
  totalCount: 0,
  totalPages: 0,
  pageNumber: 1,
  pageSize: 10,
}

export default function phongKhamReducer(
  state = initialPhongKhamState,
  action: any,
) {
  switch (action.type) {
    case PHONGKHAM.DISPATCH_LIST_PHONGKHAM:
      return {
        ...state,
        list: action.payload?.data || [],
        totalCount: action.payload?.totalCount || 0,
        totalPages: action.payload?.totalPages || 0,
        pageNumber: action.payload?.pageNumber || 1,
        pageSize: action.payload?.pageSize || state.pageSize,
      }
    default:
      return state
  }
}
