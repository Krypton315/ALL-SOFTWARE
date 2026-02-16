// ====================================
// AUTHENTICATION MIDDLEWARE
// Verify JWT token
// ====================================

const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/response');
const Logger = require('../utils/logger');

/**
 * Middleware untuk verify JWT token
 */
const verifyToken = (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return ApiResponse.error(res, 401, 'No token provided');
    }

    // Format: "Bearer <token>"
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return ApiResponse.error(res, 401, 'Invalid token format');
    }

    const token = parts[1];

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        Logger.error('JWT verification failed', err);
        return ApiResponse.error(res, 401, 'Invalid or expired token');
      }

      // Attach user info ke request object
      req.user = {
        userId: decoded.user_id,
        role: decoded.role,
      };

      Logger.info(`User authenticated: ${req.user.userId} (${req.user.role})`);
      next();
    });
  } catch (error) {
    Logger.error('Auth middleware error', error);
    return ApiResponse.error(res, 500, 'Authentication failed');
  }
};

module.exports = verifyToken;