
import { ChangeEvent, FormEvent, useState } from "react";
import { useGetMoviesQuery, useAddMoviesMutation, useUpdateMovieMutation, useDeleteMovieMutation } from "../state/movies/movieApiSlice";

import MovieCard from './CardComponent/MovieCard'
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
        console.log("New movie submit", { title, description, year, thumbnail });
        addMovie({ title, description, year: Number(year), thumbnail, id: String(movies.lenght + 1) });
        setTitle("");
        setDescription("");
        setThumbnail("");
        setYear("");
    };
    if (isError) {
        return <div>ther is an error</div>
    }
    if (isLoading) {
        return <div>loading..............</div>
    }

    return (
    <div className="movie-container">
      <h2>Movies to Watch</h2>

      {/* Form to add a new movie */}
      <div className="new-movie-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter movie title"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="imageAddress">Image Link:</label>
            <input
              type="text"
              name="imageAddress"
              id="imageAddress"
              placeholder="Enter image link address"
              value={thumbnail}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setThumbnail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year of release:</label>
            <input
              type="text"
              name="year"
              id="year"
              placeholder="Enter year of release"
              value={year}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter movie description"
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit">Add Movie</button>
        </form>
      </div>

      {/* Render list of movies */}
      <div className="movie-list">
        {movies.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          movies.map((movie: Movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} deleteMovie={deleteMovie} />
            </div>
          ))
        )}
      </div>
    </div>
    )
}

