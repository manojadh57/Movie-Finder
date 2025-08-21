import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../api";

export default function Details() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const headingRef = useRef(null);
  const nav = useNavigate();

  useEffect(() => {
    headingRef.current?.focus();
  }, [imdbID]);

  useEffect(() => {
    let ok = true;
    setLoading(true);
    setErr("");
    getMovieById(imdbID)
      .then((d) => ok && setMovie(d))
      .catch((e) => ok && setErr(e.message || "Failed"))
      .finally(() => ok && setLoading(false));
    return () => {
      ok = false;
    };
  }, [imdbID]);

  if (loading) return <div className="nb-card p-3">Loading…</div>;
  if (err)
    return (
      <div>
        <div className="nb-card p-3 border-red-600 mb-4">Error: {err}</div>
        <button className="nb-btn" onClick={() => nav(-1)}>
          Back
        </button>
      </div>
    );

  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "/poster-fallback.svg";

  return (
    <div>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-extrabold mb-4"
      >
        {movie.Title} <span className="text-neutral-600">({movie.Year})</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-4">
        <img
          src={poster}
          alt={`${movie.Title} poster`}
          className="nb-card aspect-[2/3] w-full object-cover"
        />
        <div className="nb-card p-4">
          <p className="mb-2">
            <b>Genre:</b> {movie.Genre || "—"}
          </p>
          <p className="mb-2">
            <b>Runtime:</b> {movie.Runtime || "—"}
          </p>
          <p className="mb-2">
            <b>Rated:</b> {movie.Rated || "—"}
          </p>
          <p className="mb-2">
            <b>Released:</b> {movie.Released || "—"}
          </p>
          <p className="mb-2">
            <b>Director:</b> {movie.Director || "—"}
          </p>
          <p className="mb-2">
            <b>Actors:</b> {movie.Actors || "—"}
          </p>

          <h2 className="text-xl font-extrabold mt-4 mb-2">Plot</h2>
          <p className="leading-relaxed">{movie.Plot}</p>

          <h2 className="text-xl font-extrabold mt-4 mb-2">Ratings</h2>
          <ul className="list-disc ml-5">
            {(movie.Ratings || []).length === 0 && <li>No ratings</li>}
            {(movie.Ratings || []).map((r) => (
              <li key={r.Source}>
                <b>{r.Source}</b>: {r.Value}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-2">
            <Link to={-1} className="nb-btn no-underline text-inherit">
              Back to results
            </Link>
            <a
              className="nb-btn no-underline text-inherit"
              target="_blank"
              rel="noreferrer"
              href={`https://www.imdb.com/title/${movie.imdbID}/`}
            >
              Open on IMDb
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
