const express = require("express");
const monumentRoute = express.Router();
const {
  getMonuments,
  getMonument,
  createMonument,
  updateMonument,
  deleteMonument,
  fetchFromAPI,
  addMonumentReview
} = require("../Controllers/monumentController");

monumentRoute.get("/monuments", getMonuments);
monumentRoute.get("/monuments/fetch", fetchFromAPI);
monumentRoute.get("/monuments/:id", getMonument);
monumentRoute.post("/monuments", createMonument);
monumentRoute.put("/monuments/:id", updateMonument);
monumentRoute.delete("/monuments/:id", deleteMonument);
monumentRoute.post("/monuments/:id/reviews", addMonumentReview);

module.exports = monumentRoute;

