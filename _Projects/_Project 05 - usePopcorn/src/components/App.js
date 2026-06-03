import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { MovieDetails } from "./MovieDetails";
import { Box } from "./Box";
import { WatchedList } from "./WatchedList";
import { SearchResults } from "./SearchResults";
import { WatchedSummary } from "./WatchedSummary";
import { Main } from "./Main";
import { Nav } from "./Nav";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useLocalStorage("watched", []);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [moviesError, setMoviesError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [movie, setMovie] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  function handleAddWatchedMovie(movie) {
    if (watched.some(watchedMovie => watchedMovie.imdbID === movie.imdbID)) return;
    setWatched(watched => [...watched, movie]);
  }

  function handleRemoveWatchedMovie(imdbID) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== imdbID));
  }

  function getUserRating(movie) {
    return watched.find(watchedMovie => watchedMovie.imdbID === movie.imdbID)?.userRating || null;
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  useEffect(
    function () {
      const abortController = new AbortController();
      async function fetchMovie() {
        try {
          if (!selectedId) {
            setMovie(null);
            return;
          }

          setDetailsLoading(true);
          setDetailsError(null);

          const KEY = "c0f6c879";

          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`, { signal: abortController.signal });
          const data = await res.json();

          if (data.Response === "True") setMovie(data);
          else if (data.Response === "False") throw new Error(data.Error);
        } catch (err) {
          if (err.name === "AbortError") return;

          setMovie(null);
          setDetailsError(err.message);
        } finally {
          setDetailsLoading(false);
        }
      }

      fetchMovie();

      return () => abortController.abort();
    },
    [selectedId, setMovie],
  );

  return (
    <>
      <Nav moviesCount={movies.length} setMovies={setMovies} setMoviesLoading={setMoviesLoading} setMoviesError={setMoviesError} setSelectedId={setSelectedId} />
      <Main>
        <Box>
          <SearchResults movies={movies} setSelectedId={setSelectedId} moviesLoading={moviesLoading} moviesError={moviesError} />
        </Box>

        <Box>
          {movie ? (
            <MovieDetails
              movie={movie}
              handleAddWatchedMovie={handleAddWatchedMovie}
              handleCloseMovie={handleCloseMovie}
              userCurrentRating={getUserRating(movie)}
              detailsLoading={detailsLoading}
              detailsError={detailsError}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} handleRemoveWatchedMovie={handleRemoveWatchedMovie} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
