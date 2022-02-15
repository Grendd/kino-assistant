import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import {FormattedShow} from '../../types/shows'

interface FavoriteState {
    watchedIds: number[] | []
}

const initialState: FavoriteState = {
    watchedIds: []
}

export const watchedSlice = createSlice({
  name: 'watched',
  initialState,
  reducers: {
      addWatched: (state, action: PayloadAction<number>) => {
      state.watchedIds = [...state.watchedIds, action.payload]
    },
      removeWatched: (state, action: PayloadAction<number>) => {
        state.watchedIds = state.watchedIds.filter(id => id !== action.payload)
    },
  }
})

export const {addWatched, removeWatched} = watchedSlice.actions

export const getWatchedShows = (state: RootState) => state.watched.watchedIds

export default watchedSlice.reducer