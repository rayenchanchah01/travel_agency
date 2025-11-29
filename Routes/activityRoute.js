const express = require("express");
const activityRoute = express.Router();
const {
  getActivities,
  getActivity,
  createActivity,
  updateActivity,
  deleteActivity,
  bookActivity,
  addActivityReview
} = require("../Controllers/activityController");

activityRoute.get("/activities", getActivities);
activityRoute.get("/activities/:id", getActivity);
activityRoute.post("/activities", createActivity);
activityRoute.put("/activities/:id", updateActivity);
activityRoute.delete("/activities/:id", deleteActivity);
activityRoute.post("/activities/:id/book", bookActivity);
activityRoute.post("/activities/:id/reviews", addActivityReview);

module.exports = activityRoute;

