const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/user");

// Use JWT from env 
const JWT_SECRET = process.env.JWT_SECRET || "dev_jwt_secret";
if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET not set. Using development fallback 'dev_jwt_secret'. Do NOT use this in production.");
}

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

    const newUserData = {
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      role: role || "user",
      city: city || "",
      country: country || "",
      dateOfBirth: dateOfBirth || null,
      profilePicture: profilePicture || ""
    };

    // Only include userId if provided and non-empty (avoids inserting empty string which breaks unique index)
    if (userId && String(userId).trim() !== "") {
      newUserData.userId = String(userId).trim();
    }

    const newUser = new User(newUserData);

    // Ensure a unique userId is set BEFORE save to avoid unique-index conflicts (use _id)
    if (!newUser.userId) {
      newUser.userId = newUser._id.toString();
    }

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      JWT_SECRET,
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
    // Handle duplicate key errors (e.g., email or userId already exists)
    if (error && error.code === 11000) {
      const key = Object.keys(error.keyValue || {})[0] || 'field';
      return res.status(400).json({ message: `${key} already exists` });
    }
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // Simple admin backdoor: if admin creds are used, ensure an admin user exists and log in
    if (email === 'admin@gmail.com' && password === 'admin') {
      let adminUser = await User.findOne({ email });
      if (!adminUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin', salt);
        adminUser = new User({ name: 'Admin', email, password: hashedPassword, role: 'admin' });
        adminUser.userId = adminUser._id.toString();
        await adminUser.save();
      }

      const token = jwt.sign(
        { id: adminUser._id, role: adminUser.role },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      const userResponse = adminUser.toObject();
      delete userResponse.password;

      return res.status(200).json({
        message: "Login successful",
        token,
        user: userResponse
      });
    }

    // login flow
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
      JWT_SECRET,
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

const getCurrentUser = async (req, res) => {
  // verifyToken attaches the authenticated user to req.user (without password)
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.status(200).json(req.user);
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users && users.length > 0) {
      return res.status(200).json({ users });
    }
    return res.status(404).json({ msg: "No users found" });
  } catch (error) {
    console.error("Error getting users:", error);
    return res.status(500).json({ msg: "Error on getting users" });
  }
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ message: "User deleted successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllUsers,
  getUserById,
  deleteUser
};
