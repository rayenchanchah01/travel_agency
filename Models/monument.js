const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const monumentSchema = new Schema({
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
    enum: ['historical', 'religious', 'natural', 'museum', 'palace', 'castle', 'ruins', 'other'],
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
  address: {
    type: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: { type: [Number], index: '2dsphere' }
  },
  photos: [{ type: String }],
  entryFee: {
    type: Number,
    default: 0
  },
  openingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
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
  externalId: {
    type: String // For storing external API reference IDs
  },
  source: {
    type: String,
    enum: ['local', 'api'],
    default: 'local'
  },
  website: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

monumentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Monument = mongoose.model("Monument", monumentSchema);
module.exports = Monument;

