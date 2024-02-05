import { configureStore } from "@reduxjs/toolkit"
import { moviesReducer } from "./movieSlice"
import { userReducer } from "./userSlice"
import { dashboardReducer } from "./dashboardSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
