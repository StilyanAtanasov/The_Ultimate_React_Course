import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
import { SearchResultItem } from "./SearchResultItem";

export function SearchResults({ movies, setSelectedId, moviesLoading, moviesError }) {
  return (
    <>
      {moviesLoading && <Loader />}
      {moviesError && <ErrorMessage message={moviesError} />}
      {!moviesLoading && !moviesError && (
        <ul className="list list-movies">
          {movies?.map(movie => (
            <SearchResultItem key={movie.imdbID} movie={movie} setSelectedId={setSelectedId} />
          ))}
        </ul>
      )}
    </>
  );
}
