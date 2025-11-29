const express = require("express");
const cityRoute = express.Router();
const {
  getCities,
  getCity,
  createCity,
  updateCity,
  deleteCity
} = require("../Controllers/cityController");

cityRoute.get("/cities", getCities);
cityRoute.get("/cities/:id", getCity);
cityRoute.post("/cities", createCity);
cityRoute.put("/cities/:id", updateCity);
cityRoute.delete("/cities/:id", deleteCity);

module.exports = cityRoute;
