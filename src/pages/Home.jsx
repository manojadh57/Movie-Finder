import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchMovies } from "../api";

const MIN = 2; // min characters before search
const PAGE_SIZE = 10; // OMDb fixed page size

export default function Home() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [page, setPage] = useState(Number(params.get("page") || "1"));
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    const query = q.trim().replace(/\s+/g, " ");
    if (query.length < MIN) {
      setItems([]);
      setTotal(0);
      setErr("");
      return;
    }
    setParams({ q: query, page: String(page) }, { replace: false });

    let ok = true;
    setLoading(true);
    setErr("");
    searchMovies(query, page)
      .then((r) => {
        if (!ok) return;
        setItems(r.items);
        setTotal(r.total);
        if (r.error) setErr(r.error);
      })
      .catch((e) => {
        if (!ok) return;
        setErr(e.message || "Network error");
        setItems([]);
        setTotal(0);
      })
      .finally(() => ok && setLoading(false));
    return () => {
      ok = false;
    };
  }, [q, page]); // run when q or page changes

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function onSubmit(e) {
    e.preventDefault();
    const clean = q.trim().replace(/\s+/g, " ");
    if (clean.length >= MIN) {
      setQ(clean);
      setPage(1);
    }
  }

  return (
    <div>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-extrabold mb-4"
      >
        SEARCH FOR MOVIES
      </h1>

      {/* Search box */}
      <form onSubmit={onSubmit} className="nb-card p-3">
        <label htmlFor="query" className="sr-only">
          Search movie
        </label>
        <div className="flex gap-2">
          <input
            id="query"
            className="nb-input"
            placeholder="Type a movie title (min 2 chars)"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              if (page !== 1) setPage(1);
            }}
            type="search"
            inputMode="search"
          />
          <button className="nb-btn" disabled={q.trim().length < MIN}>
            Search
          </button>
        </div>
      </form>

      {/* Error */}
      {err && (
        <div className="nb-card p-3 mt-4 border-red-600">Error: {err}</div>
      )}

      {/* Loading */}
      {loading && <div className="nb-card p-3 mt-4">Loading…</div>}

      {/* Empty */}
      {!loading && !err && q.trim().length >= MIN && items.length === 0 && (
        <div className="nb-card p-3 mt-4">No movies found.</div>
      )}

      {/* Results */}
      {!loading && !err && items.length > 0 && (
        <>
          <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {items.map((m) => (
              <li key={m.imdbID} className="nb-card overflow-hidden">
                <Link
                  to={`/movie/${m.imdbID}`}
                  className="block no-underline text-inherit"
                >
                  <img
                    src={
                      m.Poster && m.Poster !== "N/A"
                        ? m.Poster
                        : "/poster-fallback.svg"
                    }
                    alt={`${m.Title} poster`}
                    className="aspect-[2/3] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="p-2">
                    <div className="font-extrabold truncate">{m.Title}</div>
                    <div className="text-sm">Year: {m.Year || "—"}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Pager */}
          <div className="flex items-center justify-between mt-4">
            <button
              className="nb-btn disabled:opacity-60"
              disabled={page <= 1}
              onClick={() => {
                setPage((p) => p - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Prev
            </button>
            <span className="px-2 py-1 nb-border bg-white text-sm">
              Page {page} / {totalPages}
            </span>
            <button
              className="nb-btn disabled:opacity-60"
              disabled={page >= totalPages}
              onClick={() => {
                setPage((p) => p + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
