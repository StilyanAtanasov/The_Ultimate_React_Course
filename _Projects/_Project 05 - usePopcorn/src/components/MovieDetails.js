import { useState, useEffect } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
import { useKeydown } from "../hooks/useKeydown";
import { StarRating } from "./StarRating";

export function MovieDetails({ movie, handleAddWatchedMovie, handleCloseMovie, userCurrentRating = null, detailsLoading, detailsError }) {
  const [userRating, setUserRating] = useState(userCurrentRating);

  function handleAddToWatchedList() {
    const newWatchedMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      runtime: Number(movie.Runtime.split(" ")[0]) || "N/A",
      imdbRating: Number(movie.imdbRating) || "N/A",
      userRating,
    };

    handleAddWatchedMovie(newWatchedMovie);
    handleCloseMovie();
  }

  useEffect(() => {
    if (!movie.Title) return;
    document.title = movie ? `Movie | ${movie.Title}` : "usePopcorn";

    return () => (document.title = "usePopcorn");
  }, [movie]);

  useKeydown("Escape", "keydown", function () {
    handleCloseMovie();
  });

  return (
    <div className="details">
      {detailsLoading && <Loader />}
      {detailsError && <ErrorMessage message={detailsError} />}
      {!detailsLoading && !detailsError && (
        <>
          <section className="header">
            <button className="btn-back" onClick={handleCloseMovie}>
              ←
            </button>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} • {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span> {movie.imdbRating} IMDb rating
              </p>
            </div>
          </section>
          <section>
            <div className="rating">
              {userCurrentRating ? (
                <p>
                  You rated this movie {userCurrentRating} <span>⭐️</span>
                </p>
              ) : (
                <>
                  <StarRating maxRating={10} onSetRating={setUserRating} />
                  {userRating !== null && (
                    <button className="btn-add" onClick={handleAddToWatchedList}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring: {movie.Actors}</p>
            <p>Directed by: {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
