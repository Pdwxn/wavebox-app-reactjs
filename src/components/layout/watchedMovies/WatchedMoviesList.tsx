import React from "react";
import { Movie } from "../../../models/movie";
import WatchedMovie from "./WatchedMovie";

interface Props {
  watched: Movie[];
  onDeleteWatched: (id: string) => void;
}

function WatchedMoviesList({ watched, onDeleteWatched }: Props) {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovie key={movie.imdbID} movie={movie} onDeleteWatched={onDeleteWatched} />
        ))}
      </ul>
    </>
  );
}

export default WatchedMoviesList;

