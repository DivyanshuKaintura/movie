import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import MovieCard from '../movieCard/MovieCard';
import './Search.css';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (value) => {
        if (!value.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);

            if (!response.ok) {
                throw new Error('Failed to fetch results');
            }

            const data = await response.json();
            setSearchResults(data);
        } catch (err) {
            setError('Failed to fetch search results. Please try again.');
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchTerm) {
                handleSearch(searchTerm);
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    return (
        <div className="search-page">
            <div className="nav-center_s">
                <div className="search-container">
                    <Search className="search-icon" size={20} />
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Search for TV shows..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                </div>
            </div>

            <div className="movies-container">
                <div className="movies-grid">
                    {searchResults.map((movie) => (
                        <MovieCard
                            id={movie.show.id}
                            key={movie.show.id}
                            title={movie.show.name}
                            poster={movie.show.image?.original}
                            year={movie.show.premiered}
                            rating={movie.show.rating.average}
                            genres={movie.show.genres}
                            search={"search"}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;