import { ChangeEvent, FormEvent, useState } from "react";
import { useGetMoviesQuery, useAddMoviesMutation, useUpdateMovieMutation, useDeleteMovieMutation } from "../state/movies/movieApiSlice";
import React from "react";

import MovieCard from './CardComponent/MovieCard'
// ...existing code...

export interface Movie {
    title: string,
    description: string,
    year: number,
    thumbnail: string,
    id: string
}
export default function Movies() {
    // formm input state 
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<string>("");

    const { data: movies = [], isLoading, isError } = useGetMoviesQuery({})

    const [addMovie] = useAddMoviesMutation();
    const [deleteMovie] = useDeleteMovieMutation();
    // Handle form submission to add a new movie
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log("New movie submit", { title, description, year, thumbnail });
        addMovie({ title, description, year: Number(year), thumbnail, id: String((movies as any).length + 1) });
        setTitle("");
        setDescription("");
        setThumbnail("");
        setYear("");
    };
    if (isError) {
        return <div className="max-w-xl mx-auto p-6 text-red-600">There is an error</div>
    }
    if (isLoading) {
        return <div className="max-w-xl mx-auto p-6 text-gray-500">Loading...</div>
    }

    return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Movies to Watch</h2>

      {/* Form to add a new movie */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="form-group flex flex-col">
            <label htmlFor="title" className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter movie title"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              required
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="imageAddress" className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Image Link</label>
            <input
              type="text"
              name="imageAddress"
              id="imageAddress"
              placeholder="Enter image link address"
              value={thumbnail}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setThumbnail(e.target.value)}
              required
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="year" className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Year of release</label>
            <input
              type="text"
              name="year"
              id="year"
              placeholder="Enter year of release"
              value={year}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="form-group flex flex-col sm:col-span-2">
            <label htmlFor="description" className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter movie description"
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              required
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 min-h-[100px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <div className="sm:col-span-2">
            <button type="submit" className="mt-2 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Add Movie
            </button>
          </div>
        </form>
      </div>

      {/* Render list of movies */}
      <div className="movie-list grid grid-cols-1 sm:grid-cols-2 gap-4">
        {movies.length === 0 ? (
          <p className="text-white">No movies added yet.</p>
        ) : (
          movies.map((movie: Movie) => (
            <div key={movie.id} className="p-2">
              <MovieCard movie={movie} deleteMovie={deleteMovie} />
            </div>
          ))
        )}
      </div>
    </div>
    )
}
