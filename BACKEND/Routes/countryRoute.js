const express = require('express');
const router = express.Router();
const { getCountries} = require('../Controllers/countryController');

// GET all countries 
router.get('/countries', getCountries);

module.exports = router;
