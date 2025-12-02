const City = require('../Models/city');

// GET all cities
const getCities = async (req, res) => {
  try {
    const { name, country } = req.query; // query parameters for filtering
    let filter = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // case-insensitive match
    }

    if (country) {
      filter.country = { $regex: country, $options: 'i' }; // case-insensitive match
    }

    const cities = await City.find(filter);
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// GET single city by ID
const getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ msg: 'City not found' });
    }
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// POST create new city
const createCity = async (req, res) => {
  try {
    const cityData = req.body;

    if (!cityData.name || !cityData.country) {
      return res.status(400).json({ msg: 'Name and country are required' });
    }

    const newCity = new City(cityData);
    await newCity.save();

    res.status(201).json({
      msg: 'City created successfully!',
      city: newCity
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getCities,
  getCityById,
  createCity
};

