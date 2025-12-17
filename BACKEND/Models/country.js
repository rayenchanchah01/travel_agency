const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: { type: String, required: true },
  isoCode: { type: String, required: true },
  center: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  image: { type: String, required: true }
});

CountrySchema.index({ name: 1 }, { collation: { locale: 'en', strength: 2 } });

const Country = mongoose.model('Country', CountrySchema);
module.exports = Country;
