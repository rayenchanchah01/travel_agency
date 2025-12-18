const express = require('express');
const router = express.Router();
const { getCountries, getCountryById, createCountry } = require('../Controllers/countryController');

// GET all countries (optionally filtered by name)
router.get('/countries', getCountries);

// GET a single country by ID
router.get('/countries/:id', getCountryById);

// POST create a new country
router.post('/countries', createCountry);

module.exports = router;
