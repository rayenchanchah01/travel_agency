const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: { type: String, required: true },
  isoCode: { type: String },
  center: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
  },
  image: { type: String }
});

CountrySchema.index({ name: 1 }, { collation: { locale: 'en', strength: 2 } });

const Country = mongoose.model('Country', CountrySchema);
module.exports = Country;
