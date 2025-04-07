import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SavedFruits = () => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Function to fetch fruit data from our proxy server
    const fetchFruitData = async () => {
      try {
        setLoading(true);
        
        // Use our local proxy server instead of directly calling Fruityvice API
        const response = await axios.get('http://localhost:5001/api/fruits');
        
        // No need to map images as our proxy already adds them
        setFruits(response.data.slice(0, 5));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching fruit data:', err);
        setError('Failed to load fruit data. Please try again later.');
        setLoading(false);
      }
    };

    fetchFruitData();
  }, []);

  // Function to remove a fruit from the list
  const removeFruit = (fruitId) => {
    setFruits(fruits.filter(fruit => fruit.id !== fruitId));
  };

  if (loading) {
    return <div className="loading">Loading fruit information...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>Fruit Information</h2>
      <p>Here's information about various fruits from the Fruityvice API.</p>
      
      <div className="saved-fruits">
        {fruits.map(fruit => (
          <div key={fruit.id} className="fruit-item">
            <div className="fruit-image">
              <img src={fruit.image} alt={fruit.name} />
            </div>
            <div className="fruit-details">
              <h3>{fruit.name}</h3>
              <p><strong>Family:</strong> {fruit.family}</p>
              <p><strong>Genus:</strong> {fruit.genus}</p>
              <p><strong>Calories:</strong> {fruit.nutritions.calories}</p>
              <p><strong>Sugar:</strong> {fruit.nutritions.sugar}g</p>
              <p><strong>Carbohydrates:</strong> {fruit.nutritions.carbohydrates}g</p>
              <p><strong>Protein:</strong> {fruit.nutritions.protein}g</p>
            </div>
            <div className="fruit-actions">
              <button 
                className="button" 
                onClick={() => removeFruit(fruit.id)}
                style={{ backgroundColor: '#e74c3c' }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <Link to="/">
          <button className="button">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default SavedFruits;