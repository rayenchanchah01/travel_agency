const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isoCode: {
    type: String,
    required: true
  },
  isoCode3: {
    type: String
  },
  continent: {
    type: String,
    enum: ['Africa', 'Antarctica', 'Asia', 'Europe', 'North America', 'Oceania', 'South America']
  },
  capital: {
    type: String
  },
  currency: {
    code: { type: String },
    name: { type: String },
    symbol: { type: String }
  },
  languages: [{ type: String }],
  center: {
    lat: { type: Number },
    lng: { type: Number }
  },
  image: { type: String },
  flag: { type: String },
  photos: [{ type: String }],
  description: { type: String },
  isPopular: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collation: { locale: "en", strength: 2 }
});

// Index for text search
CountrySchema.index({ name: 'text' });

const Country = mongoose.model("Country", CountrySchema);
module.exports = Country;
