import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import SavedFruits from './pages/SavedFruits';

function App() {
  const [savedFruits, setSavedFruits] = useState([]);
  const location = useLocation();
  
  
  
  // Function to remove a fruit from favorites
  const removeFruit = (fruitId) => {
    setSavedFruits(savedFruits.filter(fruit => fruit.id !== fruitId));
  };
  
  return (
    <div className="container">
      <header className="header">
        <div className="nav-container">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active-nav' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/saved" 
            className={`nav-link ${location.pathname === '/saved' ? 'active-nav' : ''}`}
          >
            Saved Fruits ({savedFruits.length})
          </Link>
        </div>
        
        <div className="search-container">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search fruits..." />
          </div>
        </div>
        
        <div className="profile-section">
          <div className="plus-button">
            <i className="fas fa-plus"></i>
          </div>
          <div className="profile-icon">
            <img src="/me.png" alt="Profile" />
          </div>
        </div>
      </header>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<SavedFruits savedFruits={savedFruits} removeFruit={removeFruit} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;