import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SearchDetail.css';

const SearchDetail = () => {
    const {parm}  = useParams();
    // console.log(param);
    // const id = param.split('-')[0];
    // const title = 0;
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [summary, setSummary] = useState(null);
    const [year, setYear] = useState(null);
    const [episodes, setEpisodes] = useState({
        previous: null,
        next: null,
        latest: null
    });

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`https://api.tvmaze.com/search/shows?q=${parm.split('-')[1]}`);
                if (!response.ok) {
                    throw new Error('Movie not found');
                }
                
                const data1 = await response.json();
                const data = data1.find((movie) => movie.show.id === Number(parm.split('-')[0]));
                setMovie(data);
                setSummary(data.show.summary.replace(/<[^>]*>?/gm, ''));
                if (data.show.premiered) {
                    setYear(data.show.premiered.split('-')[0]);
                }

                // Fetch episodes
                if (data.show._links) {
                    const episodePromises = [];
                    
                    if (data.show._links.previousepisode?.href) {
                        episodePromises.push(
                            fetch(data.show._links.previousepisode.href)
                                .then(res => res.json())
                        );
                    }
                    
                    if (data.show._links.nextepisode?.href) {
                        episodePromises.push(
                            fetch(data.show._links.nextepisode.href)
                                .then(res => res.json())
                        );
                    }

                    const episodeData = await Promise.all(episodePromises);
                    
                    const episodeInfo = {
                        previous: data.show._links.previousepisode ? episodeData[0] : null,
                        next: data.show._links.nextepisode ? 
                            episodeData[data.show._links.previousepisode ? 1 : 0] : null,
                        latest: data.show._links.previousepisode ? episodeData[0] : null
                    };

                    setEpisodes(episodeInfo);
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [parm]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const EpisodeCard = ({ episode, type }) => {
        if (!episode) return null;
        
        return (
            <div className="episode-card">
                {movie.show.image?.original && (
                    <div className="episode-image">
                        <img 
                            src={movie.show.image?.original} 
                            alt={`${episode.name} thumbnail`}
                        />
                    </div>
                )}
                <div className="episode-content">
                    <div className="episode-header">
                        <span className={`episode-type ${type.toLowerCase()}`}>{type}</span>
                        <span className="episode-details">
                            Season {episode.season} Episode {episode.number}
                        </span>
                    </div>
                    <h3 className="episode-title">{episode.name}</h3>
                    <p className="episode-date">Airs: {formatDate(episode.airdate)}</p>
                    {episode.summary && (
                        <p className="episode-summary">
                            {episode.summary.replace(/<[^>]*>?/gm, '')}
                        </p>
                    )}
                </div>
            </div>
        );
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!movie) return <div className="error">Movie not found</div>;

    return (
        <div className="movie-details-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="movie-details-content">
                <div className="movie-poster-section">
                    <img src={movie.show.image?.medium} alt={`${movie.show.name} poster`} className="movie-poster-large" />
                    <div className="quick-info">
                        <a href={movie.show.officialSite} target="_blank" rel="noopener noreferrer" className="official-site-btn">
                            Official Website
                        </a>
                    </div>
                </div>

                <div className="movie-info-section">
                    <h1 className="movie-title">{movie.show.name}</h1>

                    <div className="movie-meta">
                        <span className="year">{year}</span>
                        <span className="status">{movie.show.status}</span>
                        <span className="type">{movie.show.type}</span>
                    </div>

                    <div className="genres-list">
                        {movie.show.genres.map((genre, index) => (
                            <span key={index} className="genre-tag">{genre}</span>
                        ))}
                    </div>

                    <div className="rating-info">
                        <span className="rating">
                            <span className="star">★</span>
                            {movie.show.rating.average ? `${movie.show.rating.average} / 10` : 'No rating'}
                        </span>
                    </div>

                    <div className="movie-section">
                        <h2>Overview</h2>
                        <p className="overview">{summary}</p>
                    </div>

                    <div className="movie-section">
                        <h2>Show Details</h2>
                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="detail-label">Network</span>
                                <span className="detail-value">
                                    {movie.show.network?.name} ({movie.show.network?.country.name})
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Schedule</span>
                                <span className="detail-value">
                                    {movie.show.schedule.days.join(', ')} at {movie.show.schedule.time}
                                </span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Runtime</span>
                                <span className="detail-value">{movie.show.runtime} minutes</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Language</span>
                                <span className="detail-value">{movie.show.language}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Premiered</span>
                                <span className="detail-value">{movie.show.premiered}</span>
                            </div>
                        </div>
                    </div>

                    <div className="movie-section episodes-section">
                        <h2>Episodes</h2>
                        <div className="episodes-grid">
                            <EpisodeCard 
                                episode={episodes.previous} 
                                type="Previous " 
                            />
                            <EpisodeCard 
                                episode={episodes.next} 
                                type="Next " 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchDetail;