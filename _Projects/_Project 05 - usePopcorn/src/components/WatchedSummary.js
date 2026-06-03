import average from "../helper/average";

export function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.filter(movie => !isNaN(Number(movie.imdbRating)) && Number(movie.imdbRating) !== 0).map(movie => Number(movie.imdbRating)));
  const avgUserRating = average(watched.filter(movie => !isNaN(Number(movie.userRating)) && Number(movie.userRating) !== 0).map(movie => Number(movie.userRating)));
  const avgRuntime = average(watched.filter(movie => !isNaN(Number(movie.runtime)) && Number(movie.runtime) !== 0).map(movie => Number(movie.runtime)));

  return (
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
          <span>{avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
    </div>
  );
}
