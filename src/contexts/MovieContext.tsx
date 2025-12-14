import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { Movie } from "../types/Movie";

interface MovieContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    favorites: Movie[];
    addToFavorites: (movie: Movie) => void;
    removeFromFavorites: (movieId: number) => void;
    isFavorite: (movieId: number) => boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [favorites, setFavorites] = useState<Movie[]>(() => {
        const storedFavs = localStorage.getItem("favorites");
        return storedFavs ? JSON.parse(storedFavs) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie: Movie) => {
        setFavorites(prev => [...prev, movie]);
    };

    const removeFromFavorites = (movieId: number) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    };

    const isFavorite = (movieId: number) => {
        return favorites.some(movie => movie.id === movieId);
    };

    return (
        <MovieContext.Provider value={{
            searchQuery,
            setSearchQuery,
            favorites,
            addToFavorites,
            removeFromFavorites,
            isFavorite
        }}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error("useMovieContext must be used within a MovieProvider");
    }
    return context;
};
