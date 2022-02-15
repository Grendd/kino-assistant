import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import {FormattedShow} from '../../types/shows'

interface FavoriteState {
    shows: FormattedShow[] | []
}

const initialState: FavoriteState = {
    shows: []
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavorites: (state, action: PayloadAction<FormattedShow[]>) => {
        state.shows = [...state.shows, ...action.payload]
    },
    addFavorite: (state, action: PayloadAction<FormattedShow>) => {
      state.shows = [...state.shows, action.payload]
    },
    removeFavorite: (state, action: PayloadAction<FormattedShow>) => {
        state.shows = state.shows.filter(fav => fav.name !== action.payload.name)
    },
  }
})

export const {addFavorite, addFavorites, removeFavorite} = favoriteSlice.actions

export const getFavoritesShows = (state: RootState) => state.favorites.shows

export default favoriteSlice.reducer