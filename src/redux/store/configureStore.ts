import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from '../reducers/rootReducer'
import { rootSaga } from '../sagas/rootSaga'

const middlewareSaga = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      middlewareSaga,
    ),
  devTools: import.meta.env.VITE_REDUX_DEVTOOLS === 'true',
})

middlewareSaga.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
