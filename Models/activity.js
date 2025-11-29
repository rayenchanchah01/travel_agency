const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['tour', 'adventure', 'cultural', 'water-sport', 'hiking', 'food-tour', 'nightlife', 'other'],
    default: 'other'
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // in hours
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  maxParticipants: {
    type: Number,
    default: 20
  },
  photos: [{ type: String }],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: { type: [Number], index: '2dsphere' }
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [
    {
      user: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  schedule: [
    {
      date: { type: Date, required: true },
      startTime: { type: String, required: true },
      availableSpots: { type: Number, required: true }
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;

