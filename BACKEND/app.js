const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
const cityRoute = require('./Routes/cityRoute');
const countryRoute = require('./Routes/countryRoute');
const flightRoute = require('./Routes/flightRoute');
const hotelRoute = require('./Routes/hotelRoute');
const userRoute = require('./Routes/userRoute');

// Mount routes
app.use('/api', cityRoute);      // /api/cities, /api/cities/:id, /api/cities (POST)
app.use('/api', countryRoute);   // /api/countries
app.use('/api', flightRoute);    // /api/flights, /api/flights/:id, /api/flights (POST)
app.use('/api', hotelRoute);     // /api/hotels, /api/hotels/:id/reserve, /api/hotels/:id/reviews
app.use('/api', userRoute);      // /api/register, /api/login, /api/me, /api/users...

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected to', mongoose.connection.name);
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
