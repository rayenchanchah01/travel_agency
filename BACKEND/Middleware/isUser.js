const isUser = (req, res, next) => {
  if (req.user && (req.user.role === 'user' || req.user.role === 'admin')) {
    next();
  } else {
    return res.status(403).json({ msg: 'Access denied.' });
  }
};

module.exports = isUser;
