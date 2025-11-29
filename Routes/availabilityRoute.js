const express = require("express");
const availabilityRoute = express.Router();
const {
  checkAvailability,
  getAvailability,
  setAvailability,
  bulkSetAvailability,
  blockDates,
  unblockDates
} = require("../Controllers/availabilityController");

availabilityRoute.get("/availability/check", checkAvailability);
availabilityRoute.get("/availability/:resourceType/:resourceId", getAvailability);
availabilityRoute.post("/availability", setAvailability);
availabilityRoute.post("/availability/bulk", bulkSetAvailability);
availabilityRoute.post("/availability/block", blockDates);
availabilityRoute.post("/availability/unblock", unblockDates);

module.exports = availabilityRoute;

