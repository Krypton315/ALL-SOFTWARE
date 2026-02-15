// ====================================
// USER SERVICE
// Business logic untuk user operations
// ====================================

const db = require('../config/database');
const Logger = require('../utils/logger');

class UserService {
  /**
   * Get user by ID
   */
  static async getUserById(userId) {
    try {
      const result = await db.query(
        `SELECT u.id, u.username, u.email, u.is_active, 
                u.created_at, r.name as role
         FROM users u
         JOIN roles r ON u.role_id = r.id
         WHERE u.id = $1`,
        [userId]
      );

      if (result.rows.length === 0) {
        throw new Error('User not found');
      }

      return result.rows[0];
    } catch (error) {
      Logger.error('Get user by ID error', error);
      throw error;
    }
  }

  /**
   * Get all users dengan pagination dan search
   */
  static async getUsers(page = 1, limit = 10, search = '') {
    try {
      const offset = (page - 1) * limit;

      // Build query dengan search
      let query = `
        SELECT u.id, u.username, u.email, u.is_active, 
               u.created_at, r.name as role
        FROM users u
        JOIN roles r ON u.role_id = r.id
      `;

      let countQuery = 'SELECT COUNT(*) FROM users u';
      const params = [];
      let paramIndex = 1;

      // Add search filter jika ada
      if (search) {
        query += ` WHERE u.username ILIKE $${paramIndex} OR u.email ILIKE $${paramIndex}`;
        countQuery += ` WHERE u.username ILIKE $${paramIndex} OR u.email ILIKE $${paramIndex}`;
        params.push(`%${search}%`);
        paramIndex++;
      }

      // Add pagination
      query += ` ORDER BY u.created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
      params.push(limit, offset);

      // Execute queries
      const [usersResult, countResult] = await Promise.all([
        db.query(query, params),
        db.query(countQuery, search ? [`%${search}%`] : []),
      ]);

      const users = usersResult.rows;
      const totalUsers = parseInt(countResult.rows[0].count);
      const totalPages = Math.ceil(totalUsers / limit);

      return {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          totalUsers,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      };
    } catch (error) {
      Logger.error('Get users error', error);
      throw error;
    }
  }

  /**
   * Get dashboard stats (untuk admin)
   */
  static async getDashboardStats() {
    try {
      // Query untuk berbagai statistik
      const queries = {
        totalUsers: 'SELECT COUNT(*) as count FROM users',
        activeUsers: "SELECT COUNT(*) as count FROM users WHERE is_active = true",
        usersByRole: `
          SELECT r.name as role, COUNT(u.id) as count
          FROM roles r
          LEFT JOIN users u ON u.role_id = r.id
          GROUP BY r.name
        `,
        recentUsers: `
          SELECT u.username, u.email, u.created_at, r.name as role
          FROM users u
          JOIN roles r ON u.role_id = r.id
          ORDER BY u.created_at DESC
          LIMIT 5
        `,
      };

      const [totalUsers, activeUsers, usersByRole, recentUsers] = await Promise.all([
        db.query(queries.totalUsers),
        db.query(queries.activeUsers),
        db.query(queries.usersByRole),
        db.query(queries.recentUsers),
      ]);

      return {
        totalUsers: parseInt(totalUsers.rows[0].count),
        activeUsers: parseInt(activeUsers.rows[0].count),
        usersByRole: usersByRole.rows,
        recentUsers: recentUsers.rows,
      };
    } catch (error) {
      Logger.error('Get dashboard stats error', error);
      throw error;
    }
  }
}

module.exports = UserService;