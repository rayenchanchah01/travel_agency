const Country = require("../Models/country");

// Get all countries
const getCountries = async (req, res) => {
  try {
    const { continent, search, popular } = req.query;
    let filter = {};

    if (continent) filter.continent = continent;
    if (search) filter.name = { $regex: search, $options: "i" };
    if (popular === 'true') filter.isPopular = true;

    const countries = await Country.find(filter);
    res.status(200).json({ count: countries.length, countries });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get single country
const getCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).json({ msg: "Country not found" });
    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create country
const createCountry = async (req, res) => {
  try {
    const countryData = req.body;
    if (!countryData) return res.status(400).json({ msg: "No data provided" });
    const newCountry = new Country(countryData);
    await newCountry.save();
    res.status(201).json({ msg: "Country created!", country: newCountry });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update country
const updateCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!country) return res.status(404).json({ msg: "Country not found" });
    res.status(200).json({ msg: "Country updated", country });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete country
const deleteCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);
    if (!country) return res.status(404).json({ msg: "Country not found" });
    res.status(200).json({ msg: "Country deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { getCountries, getCountry, createCountry, updateCountry, deleteCountry };
