const City = require('../Models/city');

// @desc    Get all cities (with optional filters)
// @route   GET /api/cities
// @access  Public
const getCities = async (req, res) => {
  try {
    const { name, country } = req.query;

    // Build filter object for optional query params
    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };      // case-insensitive
    if (country) filter.country = { $regex: country, $options: 'i' };

    const cities = await City.find(filter);
    res.status(200).json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get a single city by ID
// @route   GET /api/cities/:id
// @access  Public
const getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) return res.status(404).json({ message: 'City not found' });

    res.status(200).json(city);
  } catch (error) {
    console.error(error);
    // Handle invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid city ID' });
    }
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new city
// @route   POST /api/cities
// @access  Public (or protected if admin)
const createCity = async (req, res) => {
  try {
    const { name, country, center, image, description } = req.body;

    // Simple validation
    if (!name || !country) {
      return res.status(400).json({ message: 'Name and country are required' });
    }

    const newCity = new City({
      name,
      country,
      center,
      image,
      description
    });

    await newCity.save();
    res.status(201).json({
      message: 'City created successfully',
      city: newCity
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getCities,
  getCityById,
  createCity
};
