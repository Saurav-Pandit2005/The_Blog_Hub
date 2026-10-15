// Send a uniform error response
exports.fail = (res, status, error) => res.status(status).json({ success: false, error });

// Copy only the allowed keys that are present on the object
exports.pick = (obj, keys) =>
  keys.reduce((acc, key) => {
    if (obj[key] !== undefined) acc[key] = obj[key];
    return acc;
  }, {});

// True if the user owns the document or is an Admin
exports.isOwnerOrAdmin = (ownerId, user) =>
  user.role === 'Admin' || (!!ownerId && ownerId.toString() === user.id);

// Friendly message for duplicate-key errors, raw message otherwise
exports.errorMessage = (err) =>
  err.code === 11000 ? 'Username or email already exists' : err.message;

// Plain user object without the password hash
exports.withoutPassword = (user) => {
  const obj = user.toObject();
  delete obj.password;
  return obj;
};
