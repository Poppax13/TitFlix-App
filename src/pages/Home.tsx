import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import type { Movie } from "../types/Movie.ts";
import { useMovieContext } from "../contexts/MovieContext";

function Home() {
  const { searchQuery, setSearchQuery } = useMovieContext();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load popular movies or search results depending on query (initial + updates)
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        if (searchQuery.trim() === "") {
          const data = await getPopularMovies();
          setMovies(data);
          setError(null);
        } else {
          const data = await searchMovies(searchQuery);
          setMovies(data);
          setError(null);
        }
      } catch (err) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [searchQuery]); // Re-run when searchQuery changes

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The useEffect will trigger the search
  };

  return (
    <>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="home">
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
