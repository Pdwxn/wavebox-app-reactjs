import axios from "axios";
import { useEffect, useState } from "react";
import { ApiResponse } from "../models/apiResponse";
import { Movie } from "../models/movie";

interface Props {
  query: string;
}

export function useMovie({ query }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovie = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await axios.get<ApiResponse>(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (response.data.Response === "False") {
          console.error("Movie not found!");
          // eslint-disable-next-line no-constant-binary-expression
          setError("Movie not found!" || "Unknown error occurred");
          setMovies([]);
          setError("");
        } else {
          setMovies(response.data.Search || []);
          setError("");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          if (error.name !== "CanceledError") {
            setError(error.message);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 2) {
      setMovies([]);
      setError("Use the search bar to search for movies!");
      return;
    }

    fetchMovie();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
