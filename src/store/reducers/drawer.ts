import {createSlice} from '@reduxjs/toolkit'
import type { RootState } from '../store'
import {FormattedShow} from "../../types/shows";


export const BANNER_TYPES = {
    SEARCH: 'search',
    FAVORITE: 'favorite',
    NONE: undefined
} as const;

export type BannerType = typeof BANNER_TYPES[keyof typeof BANNER_TYPES]

// Define a type for the slice state
interface DrawerState {
    isPopupOpen: boolean
    openedData: FormattedShow | undefined
    type: BannerType
}

// Define the initial state using that type
const initialState: DrawerState = {
    isPopupOpen: false,
    openedData: undefined,
    type: BANNER_TYPES.NONE
}

export const drawerSlice = createSlice({
  name: 'drawer',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    openDrawer: (state, action) => {
      state.isPopupOpen = true
      state.openedData = action.payload.data
      state.type = action.payload.type
    },
    closeDrawer: (state) => {
      state.isPopupOpen = false
      state.openedData = undefined
    }
  }
})

export const {openDrawer, closeDrawer} = drawerSlice.actions

export const getIsDrawerOpen = (state: RootState): boolean => state.drawer.isPopupOpen;
export const getDrawerData = (state: RootState): FormattedShow | undefined => state.drawer.openedData;
export const getDrawerType = (state: RootState): BannerType => state.drawer.type;

export default drawerSlice.reducer