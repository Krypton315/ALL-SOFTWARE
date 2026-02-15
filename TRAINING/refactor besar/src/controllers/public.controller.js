// ====================================
// PUBLIC CONTROLLER
// Handle HTTP requests untuk public
// ====================================

const ApiResponse = require('../utils/response');
const Logger = require('../utils/logger');

class PublicController {
  /**
   * GET /public
   * Public endpoint (accessible tanpa auth)
   */
  static async getPublicData(req, res) {
    try {
      const data = {
        message: 'This is a public endpoint',
        timestamp: new Date().toISOString(),
        info: 'No authentication required',
      };

      Logger.info('Public endpoint accessed');

      return ApiResponse.success(res, data, 'Public data retrieved');
    } catch (error) {
      Logger.error('Public controller error', error);
      return ApiResponse.error(res, 'Failed to retrieve public data', 500);
    }
  }
}

module.exports = PublicController;