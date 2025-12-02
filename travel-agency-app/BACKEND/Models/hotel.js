const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
 name: {
    type: String,
    required: true
 },
 stars: {
    type: String,
    required: true
 },
 foundedIn: {
    type: String,
    required: false
 },
 city: { type: String, required: true},
 price: { type: Number, required: true },
 pricePerNight: { type: Number, required: true },
  photos: [{ type: String }],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: { type: [Number], index: '2dsphere' },
  nearbyAttractions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attraction" }]
},reviews: [
    {
      user: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 10},
      comment: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  reservations: [
    {
      checkIn: { type: Date, required: true },
      checkOut: { type: Date, required: true }
    }
  ]
}
);
const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
