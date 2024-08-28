import React from "react";
import { Movie } from '../../../models/movie';

interface Props {
    movies: Movie[];
}

function NumResults({movies}: Props) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

export default NumResults;
