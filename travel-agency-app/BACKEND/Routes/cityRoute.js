const express = require('express');
const router = express.Router();
const {
  getCities,
  getCityById,
  createCity
} = require('../Controllers/cityController');

// GET all cities (with optional filtering by name or country)
router.get('/cities', getCities);

// GET single city by ID
router.get('/cities/:id', getCityById);

// POST create new city
router.post('/cities', createCity);

module.exports = router;

