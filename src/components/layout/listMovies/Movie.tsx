import { Movie } from "../../../models/movie";

interface Props {
  movie: Movie;
  onSelectMovie: (id: string) => void;
}

const Movies = ({ movie, onSelectMovie }: Props) => {
  const imdbID = movie.imdbID || "unknown";
  const poster = movie.Poster || "";
  const title = movie.Title || "Unknown Title";
  const year = movie.Year || "Unknown Year";

  return (
    <li onClick={() => onSelectMovie(imdbID)}>
      <img src={poster} alt={`${title} poster`} />
      <h3>{title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{year}</span>
        </p>
      </div>
    </li>
  );
}

export default Movies;
