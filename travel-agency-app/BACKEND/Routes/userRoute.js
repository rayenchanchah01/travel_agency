const express = require("express");
const userRoute = express.Router();
const { registerUser, loginUser, getAllUsers, getUserById } = require("../Controllers/userController");

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/users", getAllUsers);
userRoute.get("/users/:id", getUserById);

module.exports = userRoute;