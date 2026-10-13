const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/userStore');

async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Authentication token missing or invalid format (Bearer token required)',
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'xqf2l0Wj9DGJoaGmiXcw+3+V6s6MQyvqZ23rNpnczas='
    );

    const user = await findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Student account not found or session terminated.',
      });
    }

    if (user.is_blocked) {
      return res.status(403).json({
        success: false,
        error: 'Your account has been blocked by the admin.',
      });
    }

    const { password_hash: _, ...sanitizedUser } = user;
    req.user = sanitizedUser;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Session has expired. Please log in again.',
      });
    }
    return res.status(401).json({
      success: false,
      error: 'Invalid authentication token.',
    });
  }
}

module.exports = {
  requireAuth,
};
