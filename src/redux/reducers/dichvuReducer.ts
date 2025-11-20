import { DICHVU } from '../constants/constants'

const initialDichVuState = {
  list: [] as any[],
  totalCount: 0,
  totalPages: 0,
  pageNumber: 1,
}

export default function dichvuReducer(state = initialDichVuState, action: any) {
  switch (action.type) {
    case DICHVU.DISPATCH_UPDATE_DICHVU: {
      const updated = action.payload
      return {
        ...state,
        list: state.list.map((it: any) =>
          it.id === updated.id ? { ...it, ...updated } : it,
        ),
      }
    }
    case DICHVU.DISPATCH_LIST_DICHVU:
      return {
        ...state,
        list: action.payload?.data || [],
        totalCount: action.payload?.totalCount || 0,
        totalPages: action.payload?.totalPages || 0,
        pageNumber: action.payload?.pageNumber || 1,
      }
    default:
      return state
  }
}
