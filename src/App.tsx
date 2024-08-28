import { useState } from "react";
import Navbar from "./components/layout/navbar/Navbar";
import Box from "./components/globalComponents/Box";
import NumResults from "./components/layout/navbar/NumResults";
import MovieList from "./components/layout/listMovies/MovieList";
import UserSummary from "./components/layout/watchedMovies/UserSummary";
import WatchedMoviesList from "./components/layout/watchedMovies/WatchedMoviesList";
import Loader from "./components/globalComponents/Loader";
import ErrorMessage from "./components/globalComponents/ErrorMessage";
import Search from "./components/layout/navbar/Search";
import MovieDetails from "./components/layout/watchedMovies/MovieDetails";
import { useMovie } from "./hooks/useMovie";
import { useLocalStoreState } from "./hooks/useLocalStoreState";
import { Movie } from "./models/movie";

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>("");
  const [query, setQuery] = useState<string>("");
  const [watched, setWatched] = useLocalStoreState<Movie[]>([], 'watched');
  const { movies, isLoading, error } = useMovie({ query });

  const handleSelectedMovie = (id: string) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie: Movie) => {
    const existingMovie = watched.find((m) => m.imdbID === movie.imdbID);

    if (existingMovie) {
      const updatedWatched = watched.map((m) =>
        m.imdbID === movie.imdbID ? movie : m
      );
      setWatched(updatedWatched);
    } else {
      setWatched([...watched, movie]);
    }
  };

  const handleDeleteWatched = (id: string) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <main className="main">
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <UserSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </main>
    </>
  );
}
