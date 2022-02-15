import {configureStore} from '@reduxjs/toolkit';
import drawerReducer from "./reducers/drawer";
import searchReducer from "./reducers/search";
import favoriteReducer from "./reducers/favorite";
import watchedReducer from "./reducers/watched";

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    search: searchReducer,
    favorites: favoriteReducer,
    watched: watchedReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;