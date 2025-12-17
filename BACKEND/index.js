const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const hotelRoute = require("./Routes/hotelRoute");
const userRoute = require("./Routes/userRoute");
const countryRoute = require("./Routes/countryRoute");
const cityRoute = require("./Routes/cityRoute");
const flightRoute = require("./Routes/flightRoute");
const connectDb = require("./Configuration/connectDB");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", countryRoute);
app.use("/api", hotelRoute);
app.use("/api", userRoute);
app.use("/api", cityRoute);
app.use("/api", flightRoute);

const port = process.env.PORT;

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
