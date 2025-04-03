import { configureStore } from "@reduxjs/toolkit";
import { rickAndMortyApi } from "./api/rickAndMorty";

export const store = configureStore({
  reducer: {
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});
