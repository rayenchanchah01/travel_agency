const express = require('express');
const router = express.Router();
const Country = require('../Models/country');

// GET all countries (with optional filtering by name)
router.get('/countries', async (req, res) => {
  try {
    const { name } = req.query; // query parameter for filtering
    let filter = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // case-insensitive match
    }

    const countries = await Country.find(filter);
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;

