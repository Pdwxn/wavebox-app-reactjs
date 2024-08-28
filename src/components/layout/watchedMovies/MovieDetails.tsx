import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Movie } from "../../../models/movie";
import StarRating from "../../movieReview/StarRating";
import Loader from "../../globalComponents/Loader";

interface Props {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: Movie) => void;
  watched: Movie[];
}

function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setError] = useState<string>("");
  const [userRating, setUserRating] = useState<string | number>("");

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await axios.get<Movie>(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&i=${selectedId}`
        );

        setMovie(response.data);

        const existingMovie = watched.find((m) => m.imdbID === selectedId);
        if (existingMovie) {
          setUserRating(existingMovie.userRating || "");
        } else {
          setUserRating("");
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error(err.message);
          setError("Network Error: Unable to fetch movie details.");
        } else {
          console.error("An unexpected error occurred:", err);
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [selectedId, watched]);

  useEffect(() => {
    if (!movie?.Title) return;
    document.title = `Movie | ${movie?.Title}`;
    return () => {
      document.title = "WaveMovieBox";
    };
  }, [movie?.Title]);

  const handleAdd = () => {
    if (movie) {
      const newWatchedMovie: Movie = {
        imdbID: selectedId,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        imdbRating: movie.imdbRating ? movie.imdbRating.toString() : "N/A",
        Runtime: movie.Runtime,
        userRating,
      };

      onAddWatched(newWatchedMovie);
      onCloseMovie();
    }
  };

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie?.Poster} alt={`Poster of ${movie?.Title} movie`} />
            <div className="details-overview">
              <h2>{movie?.Title}</h2>
              <p>
                {movie?.Released} &bull; {movie?.Runtime}
              </p>
              <p>{movie?.Genre}</p>
              <p>
                <span>⭐</span>
                {movie?.imdbRating} IMDb Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
                defaultRating={+userRating}
              />

              {+userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  {watched.some((m) => m.imdbID === selectedId)
                    ? "Update Rating"
                    : "+ Add to list"}
                </button>
              )}
            </div>
            <p>
              <em>{movie?.Plot}</em>
            </p>
            <p>Starring {movie?.Actors}</p>
            <p>Directed by {movie?.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
