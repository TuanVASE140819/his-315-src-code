import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './configureStore'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// during migration return a loosely typed dispatch to avoid wide refactors
export const useAppDispatch = () => useDispatch<any>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelector
