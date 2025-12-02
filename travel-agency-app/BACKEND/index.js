const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const hotelRoute = require("./Routes/hotelRoute");
const userRoute = require("./Routes/userRoute");
const countryRoute = require("./Routes/countryRoute");
const cityRoute = require("./Routes/cityRoute");
const connectDb = require("./Configuration/connectDB");

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:5173", // Vite default port
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api", countryRoute);
app.use("/api", hotelRoute);
app.use("/api", userRoute);
app.use("/api", cityRoute);

const port = process.env.PORT;

// Connect to DB first
connectDb()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });
