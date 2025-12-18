const jwt = require('jsonwebtoken');
const User = require('../Models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';
if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET not set. Using development fallback 'dev_jwt_secret'. Do NOT use this in production.");
}

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // Make sure the decoded object has the correct field
    const userId = decoded.id || decoded.userId || decoded._id;
    
    if (!userId) {
      return res.status(401).json({ msg: 'Invalid token payload' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(401).json({ msg: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = verifyToken;