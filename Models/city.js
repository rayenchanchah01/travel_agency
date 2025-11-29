const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  countryCode: {
    type: String
  },
  description: {
    type: String
  },
  population: {
    type: Number
  },
  timezone: {
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
  isPopular: {
    type: Boolean,
    default: false
  },
  attractions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Monument'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for text search
citySchema.index({ name: 'text', country: 'text' });

const City = mongoose.model("City", citySchema);
module.exports = City;
