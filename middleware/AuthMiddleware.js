const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/jwt');
const { errorResponse } = require('../utils/response');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json(errorResponse('Access denied. Token not provided.'));
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json(errorResponse('Invalid token.'));
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
