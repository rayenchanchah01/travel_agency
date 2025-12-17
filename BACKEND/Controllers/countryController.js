const Country = require('../Models/country');

// @desc    Get all countries (with optional name filter)
// @route   GET /api/countries
// @access  Public
const getCountries = async (req, res) => {
  try {
    const { name } = req.query;

    const filter = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // case-insensitive search
    }

    const countries = await Country.find(filter);
    res.status(200).json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get a country by ID
// @route   GET /api/countries/:id
// @access  Public
const getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.status(200).json(country);
  } catch (error) {
    console.error(error);
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid country ID' });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new country
// @route   POST /api/countries
// @access  Public (or admin protected)
const createCountry = async (req, res) => {
  try {
    const { name, isoCode, center, image } = req.body;

    if (!name || !isoCode) {
      return res.status(400).json({ message: 'Name and isoCode are required' });
    }

    const newCountry = new Country({
      name,
      isoCode,
      center,
      image
    });

    await newCountry.save();
    res.status(201).json({
      message: 'Country created successfully',
      country: newCountry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getCountries,
  getCountryById,
  createCountry
};
