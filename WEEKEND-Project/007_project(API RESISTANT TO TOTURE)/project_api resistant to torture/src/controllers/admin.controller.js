// ====================================
// ADMIN CONTROLLER
// Handle HTTP requests untuk admin
// ====================================

const UserService = require('../services/user.service');
const ApiResponse = require('../utils/response');
const Logger = require('../utils/logger');

class AdminController {
  /**
   * GET /admin/dashboard
   * Get dashboard statistics (admin only)
   */
  static async getDashboard(req, res) {
    try {
      const stats = await UserService.getDashboardStats();

      Logger.info(`Dashboard stats retrieved by admin: ${req.user.userId}`);

      return ApiResponse.success(
        res,
        stats,
        'Dashboard statistics retrieved successfully'
      );
    } catch (error) {
      Logger.error('Get dashboard controller error', error);
      return ApiResponse.error(res, 'Failed to retrieve dashboard data', 500);
    }
  }
}

module.exports = AdminController;