const express = require('express');
const router = express.Router();
const { getFlights} = require('../Controllers/flightController');

// GET all flights (with optional filtering)
router.get('/flights', getFlights);

module.exports = router;

