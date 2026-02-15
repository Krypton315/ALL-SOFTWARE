// ====================================
// USER CONTROLLER
// Handle HTTP requests untuk user
// ====================================

const UserService = require('../services/user.service');
const CacheService = require('../services/cache.service');
const ApiResponse = require('../utils/response');
const Logger = require('../utils/logger');

class UserController {
  /**
   * GET /users/:id
   * Get user by ID
   */
  static async getUserById(req, res) {
    try {
      const userId = parseInt(req.params.id);

      if (isNaN(userId)) {
        return ApiResponse.error(res, 'Invalid user ID', 400);
      }

      const user = await UserService.getUserById(userId);

      Logger.info(`User fetched: ${user.username}`);

      return ApiResponse.success(res, user, 'User retrieved successfully');
    } catch (error) {
      Logger.error('Get user by ID controller error', error);

      if (error.message === 'User not found') {
        return ApiResponse.error(res, error.message, 404);
      }

      return ApiResponse.error(res, 'Failed to retrieve user', 500);
    }
  }

  /**
   * GET /users?page=1&limit=10&search=keyword
   * Get all users dengan pagination dan search
   */
  static async getUsers(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || '';

      // Validasi pagination params
      if (page < 1 || limit < 1 || limit > 100) {
        return ApiResponse.error(
          res,
          'Invalid pagination parameters',
          400
        );
      }

      // Check cache
      const cacheKey = `users:page=${page}:limit=${limit}:search=${search}`;
      const cachedData = CacheService.get(cacheKey);

      if (cachedData) {
        Logger.info('Users data served from cache');
        return ApiResponse.paginated(
          res,
          cachedData.users,
          cachedData.pagination,
          'Users retrieved successfully (cached)'
        );
      }

      // Get dari database
      const result = await UserService.getUsers(page, limit, search);

      // Save to cache
      CacheService.set(cacheKey, result);

      Logger.info(`Users fetched: ${result.users.length} users`);

      return ApiResponse.paginated(
        res,
        result.users,
        result.pagination,
        'Users retrieved successfully'
      );
    } catch (error) {
      Logger.error('Get users controller error', error);
      return ApiResponse.error(res, 'Failed to retrieve users', 500);
    }
  }
}

module.exports = UserController;