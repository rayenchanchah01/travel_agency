const express = require("express");
const hotelRoute = express.Router();
const {
  getHotels,
  createHotel,
  reserveHotel,
  addReview
} = require("../Controllers/hotelController");

hotelRoute.get("/hotels", getHotels);
hotelRoute.post("/hotels", createHotel);
hotelRoute.post("/hotels/:id/reserve", reserveHotel);
hotelRoute.post("/hotels/:id/reviews", addReview);

module.exports = hotelRoute;