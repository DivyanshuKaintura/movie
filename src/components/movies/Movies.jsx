import React from "react";
import "./Movies.css";
import MovieCard from "../movieCard/MovieCard.jsx";

const Movies = () => {
    const [movies, setMovies] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
  
    React.useEffect(() => {
      const fetchMovies = async () => {
        try {
          // Replace with your API endpoint
          const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
          if (!response.ok) {
            throw new Error('Failed to fetch movies');
          }
          const data = await response.json();
          setMovies(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchMovies();
    }, []);
  
    if (loading) {
      return <div className="loading">Loading movies...</div>;
    }
  
    if (error) {
      return <div className="error">Error: {error}</div>;
    }

    return (
      <div className="movies-container">
        <h2 className="movies-title">Featured Movies</h2>
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard
              id={movie.show.id}  
              key={movie.show.id}
              title={movie.show.name}
              poster={movie.show.image?.original} 
              year={movie.show.premiered}
              rating={movie.show.rating.average}
              genres={movie.show.genres}
              search={"home"}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default Movies;