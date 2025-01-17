import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({id, title, poster, year, rating, genres, search }) => {
  const [isHovered, setIsHovered] = useState(false);
  if (year){
    year = year.split('-')[0]
  }
  const navigate = useNavigate();

  
  const handleClick = () => {
    if (search==="home"){
    navigate(`/movie/${id}`);
    }
    else{
      const parm = id + "-" + title;
      navigate(`/search/${parm}`);
    }
  };

  
  return (
    <div
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={`movie-poster ${isHovered ? 'hovered' : ''}`}>
        <img src={poster} alt={`${title} poster`} />
        {isHovered && (
          <div className="overlay">
            <div className="rating_c">
              <p className="star_c">★</p>
              <p>{rating ? `${rating} / 10` : 'Rating not available'}</p>
            </div>
            <div className="genres">
              {genres.map((genre, index) => (
                <span key={index} className="genre">{genre}</span>
              ))}
            </div>
            <p className="movie-year">{year}</p>
          </div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title_c">{title}</h3>

      </div>
    </div>
  );
};

export default MovieCard;