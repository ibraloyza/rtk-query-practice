import { configureStore } from "@reduxjs/toolkit";

import { moviesApiSlice } from "./movies/movieApiSlice";

export const store = configureStore({
    reducer: {
        [moviesApiSlice.reducerPath]: moviesApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware().concat(moviesApiSlice.middleware);
    }
})