const express = require("express");
const countryRoute = express.Router();
const {
  getCountries,
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry
} = require("../Controllers/countryController");

countryRoute.get("/countries", getCountries);
countryRoute.get("/countries/:id", getCountry);
countryRoute.post("/countries", createCountry);
countryRoute.put("/countries/:id", updateCountry);
countryRoute.delete("/countries/:id", deleteCountry);

module.exports = countryRoute;
