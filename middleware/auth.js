const jwt = require('jsonwebtoken');
const User = require('../modal/user');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // The user ID is now available in `req.user.id`
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};