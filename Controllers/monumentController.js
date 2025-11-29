const Monument = require("../Models/monument");
const axios = require("axios");

// Get all monuments with filters
const getMonuments = async (req, res) => {
  try {
    const { city, country, type, search } = req.query;
    let filter = { isActive: true };

    if (city) filter.city = { $regex: city, $options: "i" };
    if (country) filter.country = { $regex: country, $options: "i" };
    if (type) filter.type = type;
    if (search) filter.name = { $regex: search, $options: "i" };

    const monuments = await Monument.find(filter);
    res.status(200).json({ count: monuments.length, monuments });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get single monument
const getMonument = async (req, res) => {
  try {
    const monument = await Monument.findById(req.params.id);
    if (!monument) return res.status(404).json({ msg: "Monument not found" });
    res.status(200).json(monument);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create monument
const createMonument = async (req, res) => {
  try {
    const monumentData = req.body;
    if (!monumentData) return res.status(400).json({ msg: "No data provided" });
    const newMonument = new Monument(monumentData);
    await newMonument.save();
    res.status(201).json({ msg: "Monument created!", monument: newMonument });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update monument
const updateMonument = async (req, res) => {
  try {
    const monument = await Monument.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!monument) return res.status(404).json({ msg: "Monument not found" });
    res.status(200).json({ msg: "Monument updated", monument });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Delete monument
const deleteMonument = async (req, res) => {
  try {
    const monument = await Monument.findByIdAndDelete(req.params.id);
    if (!monument) return res.status(404).json({ msg: "Monument not found" });
    res.status(200).json({ msg: "Monument deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Fetch monuments from external API (Nominatim - FREE, no key needed)
const fetchFromAPI = async (req, res) => {
  try {
    const { city, country } = req.query;

    if (!city) {
      return res.status(400).json({ msg: "city is required" });
    }

    // Use Nominatim (OpenStreetMap) - FREE, no API key needed
    const searchQuery = country ? `${city}, ${country}` : city;
    const url = `https://nominatim.openstreetmap.org/search?q=tourism+${encodeURIComponent(searchQuery)}&format=json&limit=20&extratags=1`;

    const response = await axios.get(url, {
      headers: { 'User-Agent': 'TravelAgencyApp/1.0' }
    });

    const places = response.data || [];
    const monumentsToSave = [];

    for (const place of places) {
      const existing = await Monument.findOne({ externalId: String(place.place_id) });
      if (!existing && place.display_name) {
        monumentsToSave.push({
          name: place.display_name.split(',')[0],
          description: place.type || "Tourist attraction",
          type: mapPlaceType(place.type, place.class),
          city: city,
          country: country || "Unknown",
          address: place.display_name,
          location: { type: "Point", coordinates: [parseFloat(place.lon), parseFloat(place.lat)] },
          externalId: String(place.place_id),
          source: "api"
        });
      }
    }

    if (monumentsToSave.length > 0) {
      await Monument.insertMany(monumentsToSave);
    }

    res.status(200).json({ msg: `Fetched ${monumentsToSave.length} monuments`, imported: monumentsToSave.length, data: monumentsToSave });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Helper function
function mapPlaceType(type, placeClass) {
  if (!type) return "other";
  if (type.includes("museum")) return "museum";
  if (type.includes("castle")) return "castle";
  if (type.includes("palace")) return "palace";
  if (type.includes("church") || type.includes("mosque") || placeClass === "amenity") return "religious";
  if (type.includes("ruins") || type.includes("archaeological")) return "ruins";
  if (type.includes("monument") || type.includes("memorial")) return "historical";
  if (placeClass === "natural") return "natural";
  return "other";
}

// Add review
const addMonumentReview = async (req, res) => {
  try {
    const { user, rating, comment } = req.body;
    if (!user || rating === undefined) return res.status(400).json({ msg: "user and rating required" });

    const monument = await Monument.findById(req.params.id);
    if (!monument) return res.status(404).json({ msg: "Monument not found" });

    monument.reviews.push({ user, rating: Number(rating), comment });
    const totalRating = monument.reviews.reduce((sum, r) => sum + r.rating, 0);
    monument.rating = totalRating / monument.reviews.length;

    await monument.save();
    res.status(200).json({ msg: "Review added", monument });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { getMonuments, getMonument, createMonument, updateMonument, deleteMonument, fetchFromAPI, addMonumentReview };

