const City = require("../Models/city");

// Get all cities
const getCities = async (req, res) => {
  try {
    const { country, search, popular } = req.query;
    let filter = {};

    if (country) filter.country = { $regex: country, $options: "i" };
    if (search) filter.name = { $regex: search, $options: "i" };
    if (popular === 'true') filter.isPopular = true;

    const cities = await City.find(filter).populate('attractions');
    res.status(200).json({ count: cities.length, cities });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get single city
const getCity = async (req, res) => {
  try {
    const city = await City.findById(req.params.id).populate('attractions');
    if (!city) return res.status(404).json({ msg: "City not found" });
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create city
const createCity = async (req, res) => {
  try {
    const cityData = req.body;
    if (!cityData) return res.status(400).json({ msg: "No data provided" });
    const newCity = new City(cityData);
    await newCity.save();
    res.status(201).json({ msg: "City created!", city: newCity });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update city
const updateCity = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!city) return res.status(404).json({ msg: "City not found" });
    res.status(200).json({ msg: "City updated", city });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete city
const deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) return res.status(404).json({ msg: "City not found" });
    res.status(200).json({ msg: "City deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { getCities, getCity, createCity, updateCity, deleteCity };
