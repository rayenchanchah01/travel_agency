const express = require('express');
const router = express.Router();
const { getFlights, getFlightById, createFlight } = require('../Controllers/flightController');

// GET all flights (with optional filtering)
router.get('/flights', getFlights);

// GET single flight by ID
router.get('/flights/:id', getFlightById);

// POST create new flight
router.post('/flights', createFlight);

module.exports = router;

