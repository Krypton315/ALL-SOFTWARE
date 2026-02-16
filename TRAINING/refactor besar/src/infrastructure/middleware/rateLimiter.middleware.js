// ====================================
// RATE LIMITER MIDDLEWARE
// Limit request berdasarkan IP
// ====================================

const ApiResponse = require('../utils/response');
const Logger = require('../utils/logger');

class RateLimiter {
  constructor() {
    this.requests = new Map();
    this.windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000; // 1 menit
    this.maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5;
  }

  /**
   * Middleware untuk rate limiting
   */
  limit() {
    return (req, res, next) => {
      const ip = req.ip || req.connection.remoteAddress;
      const now = Date.now();

      // Get request history untuk IP ini
      if (!this.requests.has(ip)) {
        this.requests.set(ip, []);
      }

      const requestHistory = this.requests.get(ip);

      // Filter request yang masih dalam window
      const recentRequests = requestHistory.filter(
        (timestamp) => now - timestamp < this.windowMs
      );

      // Check apakah melebihi limit
      if (recentRequests.length >= this.maxRequests) {
        Logger.warn(`Rate limit exceeded for IP: ${ip}`);
        
        return ApiResponse.error(
          res,
          'Too many requests, please try again later',
          429
        );
      }

      // Add request timestamp
      recentRequests.push(now);
      this.requests.set(ip, recentRequests);

      // Cleanup old entries setiap 5 menit
      if (Math.random() < 0.01) {
        this.cleanup();
      }

      next();
    };
  }

  /**
   * Cleanup expired entries
   */
  cleanup() {
    const now = Date.now();
    
    for (const [ip, timestamps] of this.requests.entries()) {
      const validTimestamps = timestamps.filter(
        (ts) => now - ts < this.windowMs
      );

      if (validTimestamps.length === 0) {
        this.requests.delete(ip);
      } else {
        this.requests.set(ip, validTimestamps);
      }
    }

    console.log('Rate limiter cleanup completed');
  }
}

// Singleton instance
const rateLimiter = new RateLimiter();

module.exports = rateLimiter.limit();