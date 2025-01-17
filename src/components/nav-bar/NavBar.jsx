import React from "react";
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import logo from '../../assests/images/logo.png';
import './NavBar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleSearchClick = () => {
        navigate('/search');
    };

    return (
        <div>
            <nav className="navbar">
                <a href="/">
                    <div className="nav-brand">
                        <img src={logo} alt="logo" className="logo" />
                        <span className="app-name">Movie-QuadB</span>
                    </div></a>

                <div className="nav-center" onClick={handleSearchClick}>
                    <img className="img_search" src="" alt="" />
                    <p className="search">Search for movies</p>
                </div>

                <ul className="nav-links">
                    <li><a href="" className="nav-link">Home</a></li>
                    <li><a href="" className="nav-link">About</a></li>
                    <li><a href="" className="nav-link">Contact</a></li>
                </ul>
            </nav>
            <div className="info">Enjoy the amazing movies with friends and family</div>
        </div>
    );
};

export default Navbar;