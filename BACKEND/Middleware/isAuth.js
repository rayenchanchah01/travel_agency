const jwt = require('jsonwebtoken');
const User = require('../Models/user');

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) return next(); // no token, proceed to signup/login

    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (user) {
        return res.status(400).json({ msg: 'Already logged in.' });
      }
      
    }
    next();
  } catch (error) {
    next(); // token invalid, allow login/signup
  }
};

module.exports = isAuth;