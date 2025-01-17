import React, { useState, useEffect } from 'react';
import './SplashScreen.css';  // We'll create this file next
import logo from '../../assests/images/logo.png'
import Home from '../home/Home';


// Splash Screen component
const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="splash-container">
          <div className="logo-container">
            {/* You can replace this with your logo */}
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <h1 className="splash-title">Welcome to the Movie-QuadB!</h1>
          <p className="splash-text">Loading amazing movies...</p>
        </div>
      ) : (
        <Home />
      )}
    </>
  );
};

export default SplashScreen;