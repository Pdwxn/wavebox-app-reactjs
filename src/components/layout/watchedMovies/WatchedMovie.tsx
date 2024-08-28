import { Movie } from "../../../models/movie";

interface Props {
  movie: Movie;
  onDeleteWatched: (id: string) => void;
}

const WatchedMovie = ({ movie, onDeleteWatched }: Props) => {
  return (
    <>
      <li>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span> 
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.Runtime}</span>
          </p>

          <button className="btn-delete" onClick={() => movie.imdbID && onDeleteWatched(movie.imdbID)}>X</button>
        </div>
      </li>
    </>
  );
};

export default WatchedMovie;
