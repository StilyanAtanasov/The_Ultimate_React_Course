import { WatchedListItem } from "./WatchedListItem";

export function WatchedList({ watched, handleRemoveWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map(movie => (
        <WatchedListItem key={movie.imdbID} movie={movie} handleRemoveWatchedMovie={handleRemoveWatchedMovie} />
      ))}
    </ul>
  );
}
