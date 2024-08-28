import Movies from "./Movie";
import { Movie } from "../../../models/movie";

interface Props {
  movies: Movie[];
  onSelectMovie: (id: string) => void;
}

const MovieList = ({ movies, onSelectMovie }: Props) => {
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <Movies key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
};

export default MovieList;
