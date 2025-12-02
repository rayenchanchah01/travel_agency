const User = require("../Models/user");

// Register new user
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Create new user
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      role: 'user'
    });

    // Save user (password will be hashed automatically)
    await newUser.save();

    res.status(201).json({
      msg: "User registered successfully!",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ msg: "Email or password is wrong" });
    }

    // Check if password is correct
    const isCorrect = await user.checkPassword(password);
    if (!isCorrect) {
      return res.status(401).json({ msg: "Email or password is wrong" });
    }

    // Login successful
    res.status(200).json({
      msg: "Login successful!",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// Get one user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


module.exports = { registerUser, loginUser, getAllUsers, getUserById };