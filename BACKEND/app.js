const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// load variables
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
app.use('/api', cityRoute);     
app.use('/api', countryRoute); 
app.use('/api', flightRoute);   
app.use('/api', hotelRoute);    
app.use('/api', userRoute);     

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const connectDb = require('./Configuration/connectDB');

connectDb()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Unable to start server due to DB connection error:', err);
    process.exit(1);
  });
