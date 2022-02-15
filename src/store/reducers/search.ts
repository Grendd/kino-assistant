import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../store'
import {FormattedShow} from '../../types/shows'

interface SearchState {
    shows: FormattedShow[] | []
}

const initialState: SearchState = {
    shows: []
}

export const searchSlice = createSlice({
  name: 'search',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    searchShows: (state, action: PayloadAction<FormattedShow[]>) => {
      state.shows = action.payload
    },
  }
})

export const {searchShows} = searchSlice.actions

export const getSearchShows = (state: RootState) => state.search.shows

export default searchSlice.reducer