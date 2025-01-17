import React from 'react';
import NavBar from '../nav-bar/NavBar';
import Movies from '../movies/Movies';
import MovieDetails from '../movieDetails/MovieDetails';
import SearchDetail from '../searchDetails/SearchDetail'; 
import Search from '../search/Search';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Home component (you can replace this with your actual Home component)
const Home = () => {
  return (
    <Router>
      <NavBar />
      <Movies />
      <Routes>
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path='/search' element={<Search />} />
        <Route path='search/:parm' element={<SearchDetail />} />
      </Routes>
    </Router>
  );
};

export default Home;