const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
  flightNumber: { type: String, required: true, unique: true },
  airline: { type: String, required: true },
  origin: {
    city: { type: String, required: true },
    country: { type: String, required: true }
  },
  destination: {
    city: { type: String, required: true },
    country: { type: String, required: true }
  },
  departure: { type: Date, required: true },
  arrival: { type: Date, required: true },
  duration: { type: String },
  price: {
    economy: { type: Number, required: true },
    business: { type: Number },
    firstClass: { type: Number }
  },
  availableSeats: {
    economy: { type: Number, default: 150 },
    business: { type: Number, default: 30 },
    firstClass: { type: Number, default: 10 }
  },
  status: { 
    type: String, 
    enum: ['scheduled', 'delayed', 'cancelled', 'boarding', 'departed'], 
    default: 'scheduled' 
  }
});

const Flight = mongoose.model('Flight', FlightSchema);
module.exports = Flight;