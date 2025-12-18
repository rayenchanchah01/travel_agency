const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/user");

// =======================
// Register user
// =======================
const registerUser = async (req, res) => {
  try {
    const {
      name,
      userId,
      email,
      password,
      phone,
      role,
      city,
      country,
      dateOfBirth,
      profilePicture
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      role: role || "user",
      city: city || "",
      country: country || "",
      dateOfBirth: dateOfBirth || null,
      profilePicture: profilePicture || "",
      userId: userId || ""
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: "User created successfully",
      token,
      user: userResponse
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// Login user
// =======================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: "Login successful",
      token,
      user: userResponse
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =======================
// Get current user
// =======================
const getCurrentUser = async (req, res) => {
  res.status(200).json(req.user);
};

// =======================
// Admin: Get all users
// =======================
const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
};

// =======================
// Admin: Get user by ID
// =======================
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
};

// =======================
// Admin: Delete user
// =======================
const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User deleted successfully" });
};

// =======================
// EXPORTS (IMPORTANT)
// =======================
module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  deleteUser
};
