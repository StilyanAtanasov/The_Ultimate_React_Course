import { useState, useRef, useEffect } from "react";
import { useKeydown } from "../hooks/useKeydown";

export function Nav({ moviesCount, setMovies, setMoviesLoading, setMoviesError, setSelectedId }) {
  const [query, setQuery] = useState("");

  const queryRef = useRef();

  useKeydown("Enter", "keydown", function () {
    queryRef.current.focus();
    setQuery("");
    setMovies([]);
    setSelectedId(null);
    setMoviesError(null);
  });

  useEffect(
    function () {
      const abortController = new AbortController();
      async function fetchMovies() {
        try {
          if (query.length < 3) {
            setMovies([]);
            setMoviesError(null);
            return;
          }

          setMoviesLoading(true);
          setMoviesError(null);

          const KEY = "c0f6c879";

          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: abortController.signal });

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error(data.Error);
          }

          setMovies(data.Search);
        } catch (err) {
          if (err.name === "AbortError") return;

          setMovies([]);
          setMoviesError(err.message);
        } finally {
          setMoviesLoading(false);
        }
      }

      fetchMovies();

      return () => abortController.abort();
    },
    [query, setMovies, setMoviesLoading, setMoviesError],
  );

  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input className="search" type="text" placeholder="Search movies..." value={query} onChange={e => setQuery(e.target.value)} ref={queryRef} />
      <p className="num-results">
        Found <strong>{moviesCount}</strong> results
      </p>
    </nav>
  );
}
