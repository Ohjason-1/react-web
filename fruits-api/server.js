const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Proxy route for all Fruityvice API requests
app.get('/api/fruits', async (req, res) => {
  try {
    const response = await axios.get('https://www.fruityvice.com/api/fruit/all');
    
    // Add image URLs to the fruits
    const fruitsWithImages = response.data.map(fruit => ({
      ...fruit,
      image: `https://source.unsplash.com/200x150/?${fruit.name.toLowerCase()}`
    }));
    
    res.json(fruitsWithImages);
  } catch (error) {
    console.error('Error fetching from Fruityvice API:', error);
    res.status(500).json({ error: 'Failed to fetch fruit data' });
  }
});

// Route for a specific fruit
app.get('/api/fruits/:name', async (req, res) => {
  try {
    const fruitName = req.params.name;
    const response = await axios.get(`https://www.fruityvice.com/api/fruit/${fruitName}`);
    
    const fruitWithImage = {
      ...response.data,
      image: `https://source.unsplash.com/200x150/?${fruitName.toLowerCase()}`
    };
    
    res.json(fruitWithImage);
  } catch (error) {
    console.error('Error fetching fruit:', error);
    res.status(404).json({ error: 'Fruit not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});