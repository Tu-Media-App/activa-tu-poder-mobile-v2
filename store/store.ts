import { configureStore } from '@reduxjs/toolkit'
import loadingSliceReducer from './slices/loadingSlice'

export const store = configureStore({
  reducer: {
    loader: loadingSliceReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch