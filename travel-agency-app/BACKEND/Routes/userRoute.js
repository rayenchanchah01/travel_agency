const express = require("express");
const userRoute = express.Router();
const { registerUser, loginUser, getCurrentUser, getAllUsers, getUserById, deleteUser } = require("../Controllers/userController");
const { verifyToken, isAdmin } = require("../Middleware/authMiddleware");

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUser);
userRoute.get("/me", verifyToken, getCurrentUser);
userRoute.get("/users", verifyToken, isAdmin, getAllUsers);
userRoute.get("/users/:id", verifyToken, isAdmin, getUserById);
userRoute.delete("/users/:id", verifyToken, isAdmin, deleteUser);

module.exports = userRoute;