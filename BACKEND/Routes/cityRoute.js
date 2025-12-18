const express = require('express');
const router = express.Router();
const {
  getCities,
} = require('../Controllers/cityController');

// GET all cities 
router.get('/cities', getCities);

module.exports = router;

