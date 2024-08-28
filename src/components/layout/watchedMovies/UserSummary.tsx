import { Movie } from "../../../models/movie";

interface Props {
  watched: Movie[];
}

const UserSummary = ({ watched }: Props) => {
  const average = (arr: number[]): number =>
    arr.reduce((acc, cur, _i, arr) => acc + cur / arr.length, 0);

  const parseRating = (rating: string | number | undefined): number => {
    if (typeof rating === 'number') {
      return rating;
    }
    if (typeof rating === 'string') {
      return parseFloat(rating);
    }
    return 0;
  };

  const parseRuntime = (runtime: string | undefined): number =>
    runtime ? parseFloat(runtime.split(" ")[0]) : 0;

  const imdbRatings = watched.map((movie) => parseRating(movie.imdbRating));
  const userRatings = watched.map((movie) => parseRating(movie.userRating));
  const runtimes = watched.map((movie) => parseRuntime(movie.Runtime));

  const avgImdbRating = average(imdbRatings);
  const avgUserRating = average(userRatings);
  const avgRuntime = average(runtimes);

  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          <p>
            <span>⭐️</span>
            <span>{avgImdbRating.toFixed(1)}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{avgUserRating.toFixed(1)}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{avgRuntime.toFixed(1)} min</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserSummary;
