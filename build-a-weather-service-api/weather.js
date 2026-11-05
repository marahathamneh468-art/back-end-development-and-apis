import express from 'express';

const router = express.Router();

const SUPPORTED_CITIES = ['London', 'Tokyo', 'New York', 'Paris', 'Amman'];

// GET /api/weather
router.get('/', (req, res) => {
  res.status(200).json({
    cities: SUPPORTED_CITIES
  });
});

// Lesson 15 & 16: GET /api/weather/:city with try/catch and response.ok check
router.get('/:city', async (req, res) => {
  const { city } = req.params;
  try {
    const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${city}`);
    
    if (!response.ok) {
      throw new Error(`Status ${response.status}`);
    }

    const data = await response.json();
    
    res.status(200).json({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description
    });
  } catch (error) {
    res.status(404).json({
      error: `Could not fetch weather data for "${city}".`
    });
  }
});

export default router;