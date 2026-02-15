// ====================================
// AUTH CONTROLLER
// Handle HTTP requests untuk auth
// ====================================

const AuthService = require('../services/auth.service');
const ApiResponse = require('../utils/response');
const Logger = require('../utils/logger');

class AuthController {
  /**
   * POST /auth/register
   * Register user baru
   */
  static async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Validasi input
      if (!username || !email || !password) {
        return ApiResponse.error(
          res,
          'All fields are required',
          400,
          { required: ['username', 'email', 'password'] }
        );
      }

      // Validasi email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return ApiResponse.error(res, 'Invalid email format', 400);
      }

      // Validasi password minimal 6 karakter
      if (password.length < 6) {
        return ApiResponse.error(
          res,
          'Password must be at least 6 characters',
          400
        );
      }

      const user = await AuthService.register(username, email, password);

      Logger.info(`User registered successfully: ${user.username}`);

      return ApiResponse.success(
        res,
        user,
        'User registered successfully',
        201
      );
    } catch (error) {
      Logger.error('Register controller error', error);

      if (error.message.includes('already')) {
        return ApiResponse.error(res, error.message, 409);
      }

      return ApiResponse.error(res, 'Registration failed', 500);
    }
  }

  /**
   * POST /auth/login
   * Login user
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validasi input
      if (!email || !password) {
        return ApiResponse.error(
          res,
          'Email and password are required',
          400
        );
      }

      const result = await AuthService.login(email, password);

      Logger.info(`User logged in successfully: ${result.user.username}`);

      return ApiResponse.success(res, result, 'Login successful');
    } catch (error) {
      Logger.error('Login controller error', error);

      if (error.message === 'Invalid credentials') {
        return ApiResponse.error(res, 'Invalid email or password', 401);
      }

      if (error.message === 'Account is inactive') {
        return ApiResponse.error(res, error.message, 403);
      }

      return ApiResponse.error(res, 'Login failed', 500);
    }
  }
}

module.exports = AuthController;