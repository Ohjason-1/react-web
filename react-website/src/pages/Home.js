import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Fruitopia</h1>
      <p>Discover nutritional information about your favorite fruits</p>
      
      <div className="home-image">
        <img 
          src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
          alt="Assorted fruits" 
        />
      </div>
      
      <p>Our application provides detailed information about various fruits, their nutritional values, and health benefits.</p>
    </div>
  );
};

export default Home;