const BASE = import.meta.env.VITE_OMDB_BASE || "https://www.omdbapi.com/";
const KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function searchMovies(q, page = 1) {
  if (!KEY) throw new Error("Missing VITE_OMDB_API_KEY");
  const url = `${BASE}?apikey=${KEY}&s=${encodeURIComponent(
    q
  )}&type=movie&page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === "False")
    return { items: [], total: 0, error: data.Error || "No results" };
  return {
    items: data.Search || [],
    total: Number(data.totalResults || 0),
    error: null,
  };
}

export async function getMovieById(id) {
  if (!KEY) throw new Error("Missing VITE_OMDB_API_KEY");
  const url = `${BASE}?apikey=${KEY}&i=${encodeURIComponent(id)}&plot=full`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.Response === "False") throw new Error(data.Error || "Not found");
  return data;
}
