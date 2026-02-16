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
      return ApiResponse.error(res, 'No token provided', 401);
    }

    // Format: "Bearer <token>"
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return ApiResponse.error(res, 'Invalid token format', 401);
    }

    const token = parts[1];

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        Logger.error('JWT verification failed', err);
        return ApiResponse.error(res, 'Invalid or expired token', 401);
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
    return ApiResponse.error(res, 'Authentication failed', 500);
  }
};

module.exports = verifyToken;