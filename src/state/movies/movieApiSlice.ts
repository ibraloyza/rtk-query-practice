import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import {createApi,fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const moviesApiSlice = createApi({
    reducerPath: "movies",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
    }),
    endpoints: (builder) => {
        return {
            getMovies: builder.query({
                query: ()=> `/movies`,
            }),
            addMovies: builder.mutation({
                query: (movie) => ({
                    url: "/movie",
                    method: "POST",
                    body: movie,
                })
            }),
            updateMovie: builder.mutation({
                query: (movie) => {
                    const { id, ...body } = movie;
                    return {
                        url: `movie/${id}`,
                        method: "POST",
                        body
                    }
                }
            }),
            deleteMovie: builder.mutation({
                query: ({ id }) => ({
                    url: `movie/${id}`,
                    method: "DELETE",
                    body: id,
                })
            })

        }
    }
    
})

export const { useGetMoviesQuery,useAddMoviesMutation,useUpdateMovieMutation,useDeleteMovieMutation} = moviesApiSlice;