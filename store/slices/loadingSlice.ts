import { createSlice } from '@reduxjs/toolkit'

export interface LoadingState {
  loading: boolean
}

const initialState: LoadingState = {
    loading: false,
}

export const loadingSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loading = true
    },
    hideLoader: (state) => {
        state.loading = false
    },
  },
})

export const { showLoader, hideLoader } = loadingSlice.actions

export default loadingSlice.reducer