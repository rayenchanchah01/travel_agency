const express = require("express");
const userRoute = express.Router();

// Controllers
const {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  deleteUser
} = require("../Controllers/userController");

// Middlewares
const verifyToken = require("../Middleware/verifyToken");
const isAdmin = require("../Middleware/isAdmin");
const isUser = require("../Middleware/isUser");
const isAuth = require("../Middleware/isAuth");

// Routes

// Register - use isAuth to prevent already logged-in users from registering again
userRoute.post("/register", isAuth, registerUser);

// Login - use isAuth to prevent already logged-in users from logging in again
userRoute.post("/login", isAuth, loginUser);

// Get current logged-in user
userRoute.get("/me", verifyToken, getCurrentUser);

// Get all users (admin only)
userRoute.get("/users", verifyToken, isAdmin, getAllUsers);

// Get single user by ID (admin only)
userRoute.get("/users/:id", verifyToken, isAdmin, getUserById);

// Delete user by ID (admin only)
userRoute.delete("/users/:id", verifyToken, isAdmin, deleteUser);

module.exports = userRoute;
