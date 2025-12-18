const dotenv = require("dotenv");

dotenv.config();
const mongoose = require("mongoose");

const url = process.env.MONGO_URL || "mongodb://localhost:27017/webpp";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`Connected to MongoDB (${conn.connection.name}) at ${url}`);
    return conn;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

module.exports = connectDb;
