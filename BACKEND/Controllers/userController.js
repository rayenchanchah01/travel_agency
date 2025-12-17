const User = require("../Models/user");

// Register user
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, role, city, country, dateOfBirth, profilePicture } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      role: role || "user",
      city,
      country,
      dateOfBirth,
      profilePicture
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  // Your login logic here
  res.status(200).json({ message: "Login route" });
};

// Get current logged-in user
const getCurrentUser = async (req, res) => {
  // Your logic to get current user
  res.status(200).json({ message: "Current user route" });
};

// Get all users (admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user (admin)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getCurrentUser, getAllUsers, getUserById, deleteUser };
