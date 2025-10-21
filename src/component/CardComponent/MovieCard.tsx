import { useRef, useState } from "react"
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
    <div className="movie-wrapper" key={movie.id}>
      <div className="img-wrapper">
        <img src={movie.thumbnail} alt={`${movie.title} poster`} />
      </div>
      <h3>
        {movie.title} ({movie.year})
      </h3>
      <p>{movie.description}</p>
      <div className="button-wrapper">
        <button onClick={handleSelectedMovie}>Edit</button>
        <button onClick={() => deleteMovie({ id: movie.id })}>Delete</button>
      </div>

      <EditModal dialogRef={dialogRef} selectedMovie={selectedMovie} closeDialog={closeDialog} />

    </div>
    )
}


export default MovieCard;