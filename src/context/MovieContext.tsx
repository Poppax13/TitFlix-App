import { createContext, useState, useContext, useEffect } from "react";
import type { Movie } from "../types/Movie";
const MovieContext = createContext<any>(null);
export const useMovieContext = () => useContext(MovieContext);
export const MovieProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  });
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  const addToFavorites = (movie) => {
    setFavorites();
  };
  return (
    <MovieContext.Provider
      value={{
        favorites,
        setFavorites,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
