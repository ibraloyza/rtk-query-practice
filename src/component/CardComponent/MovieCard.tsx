// ...existing code...
import React, { useRef, useState } from "react"
import { Movie } from '../Movies';
import EditModal from "../Modal/EditModal";

type DeleteMovie = (movie: { id: string }) => void;

interface MovieCardProps {
    movie: Movie;
    deleteMovie: DeleteMovie;
}
function MovieCard({ movie, deleteMovie }: MovieCardProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<Movie>(movie);

    const handleSelectedMovie = () => {
        setSelectedMovie(movie);
        dialogRef.current?.showModal();
        document.body.style.overflow = "hidden";
    };
    const closeDialog = (): void => {
        dialogRef.current?.close();
        document.body.style.overflow = 'visible';
    }

    return (
    <div
      className="max-w-sm w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm overflow-hidden p-4 flex flex-col gap-3"
      key={movie.id}
    >
      <div className="w-full h-56 rounded-md overflow-hidden bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
        <img
          src={movie.thumbnail}
          alt={`${movie.title} poster`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {movie.title} <span className="text-sm text-slate-500 dark:text-slate-300">({movie.year})</span>
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
          {movie.description}
        </p>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={handleSelectedMovie}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          Edit
        </button>
        <button
          onClick={() => deleteMovie({ id: movie.id })}
          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Delete
        </button>
      </div>

      <EditModal dialogRef={dialogRef} selectedMovie={selectedMovie} closeDialog={closeDialog} />

    </div>
    )
}


export default MovieCard;
// ...existing code...