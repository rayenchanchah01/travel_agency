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
const isAuth = require("../Middleware/isAuth");

// =======================
// Auth routes
// =======================
userRoute.post("/auth/signup", isAuth, registerUser);
userRoute.post("/auth/login", isAuth, loginUser);

// =======================
// User routes
// =======================
userRoute.get("/me", verifyToken, getCurrentUser);

// =======================
// Admin routes
// =======================
userRoute.get("/users", verifyToken, isAdmin, getAllUsers);
userRoute.get("/users/:id", verifyToken, isAdmin, getUserById);
userRoute.delete("/users/:id", verifyToken, isAdmin, deleteUser);

module.exports = userRoute;
