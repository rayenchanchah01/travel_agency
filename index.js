const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

// Import Routes
const hotelRoute = require("./Routes/hotelRoute");
const activityRoute = require("./Routes/activityRoute");
const monumentRoute = require("./Routes/monumentRoute");
const availabilityRoute = require("./Routes/availabilityRoute");
const cityRoute = require("./Routes/cityRoute");
const countryRoute = require("./Routes/countryRoute");

const connectDb = require("./Configuration/connectDB");

const app = express();

app.use(express.json());

// Register all API routes
app.use("/api", hotelRoute);
app.use("/api", activityRoute);
app.use("/api", monumentRoute);
app.use("/api", availabilityRoute);
app.use("/api", cityRoute);
app.use("/api", countryRoute);

const port = process.env.PORT;

app.listen(port, (err) => {
  if (err) {
    console.error("Server Failed", err.message);
  } else console.log(`Server Started at PORT ${port}`);
});

connectDb();