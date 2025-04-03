import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rickAndMortyApi = createApi({
  reducerPath: "rickAndMortyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api/" }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: (params) => ({
        url: "character",
        params: params,
      }),
    }),
    getCharacter: builder.query({
      query: (id: string) => `character/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = rickAndMortyApi;
