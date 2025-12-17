const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  center: {
    lat: { type: Number },
    lng: { type: Number }
  },
  image: { type: String },
  description: { type: String }
});

const City = mongoose.model('City', CitySchema);
module.exports = City;