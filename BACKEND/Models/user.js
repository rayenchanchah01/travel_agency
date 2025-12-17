const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, default: 'user' },
  city: { type: String },
  country: { type: String },
  dateOfBirth: { type: Date },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now }
});


const User = mongoose.model('User', UserSchema);
module.exports = User;