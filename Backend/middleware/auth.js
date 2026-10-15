const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { fail } = require('../utils/helpers');

const getToken = (req) => {
  const header = req.headers.authorization;
  return header && header.startsWith('Bearer ') ? header.split(' ')[1] : null;
};

// Require a valid token
exports.protect = async (req, res, next) => {
  const token = getToken(req);
  if (!token) return fail(res, 401, 'Not authorized to access this route');

  let user;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await User.findById(decoded.id);
  } catch (err) {
    return fail(res, 401, 'Not authorized to access this route');
  }

  if (!user) return fail(res, 401, 'Not authorized to access this route');

  req.user = user;
  next();
};

// Allow only the given roles
exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return fail(res, 403, `User role ${req.user.role} is not authorized to access this route`);
  }
  next();
};

// Set req.user when a valid token is sent, otherwise continue as a guest
exports.optionalProtect = async (req, res, next) => {
  const token = getToken(req);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    } catch (err) {
      // invalid token: treat as guest
    }
  }

  next();
};
