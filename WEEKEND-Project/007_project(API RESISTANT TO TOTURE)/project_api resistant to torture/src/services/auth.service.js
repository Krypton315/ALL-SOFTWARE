// ====================================
// AUTHENTICATION SERVICE
// Business logic untuk auth
// ====================================

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const Logger = require('../utils/logger');

class AuthService {
  /**
   * Register user baru
   */
  static async register(username, email, password) {
    try {
      // Check apakah email sudah digunakan
      const emailCheck = await db.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );

      if (emailCheck.rows.length > 0) {
        throw new Error('Email already registered');
      }

      // Check apakah username sudah digunakan
      const usernameCheck = await db.query(
        'SELECT id FROM users WHERE username = $1',
        [username]
      );

      if (usernameCheck.rows.length > 0) {
        throw new Error('Username already taken');
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Get role_id untuk 'user' (default role)
      const roleResult = await db.query(
        "SELECT id FROM roles WHERE name = 'user'"
      );

      if (roleResult.rows.length === 0) {
        throw new Error('Default role not found');
      }

      const roleId = roleResult.rows[0].id;

      // Insert user baru
      const result = await db.query(
        `INSERT INTO users (username, email, password, role_id)
         VALUES ($1, $2, $3, $4)
         RETURNING id, username, email, role_id, created_at`,
        [username, email, hashedPassword, roleId]
      );

      const user = result.rows[0];
      Logger.info(`New user registered: ${user.username} (${user.email})`);

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role_id: user.role_id,
        created_at: user.created_at,
      };
    } catch (error) {
      Logger.error('Register error', error);
      throw error;
    }
  }

  /**
   * Login user
   */
  static async login(email, password) {
    try {
      // Get user by email dengan role info
      const result = await db.query(
        `SELECT u.id, u.username, u.email, u.password, u.is_active, 
                r.name as role
         FROM users u
         JOIN roles r ON u.role_id = r.id
         WHERE u.email = $1`,
        [email]
      );

      if (result.rows.length === 0) {
        throw new Error('Invalid credentials');
      }

      const user = result.rows[0];

      // Check apakah user aktif
      if (!user.is_active) {
        throw new Error('Account is inactive');
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          user_id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN || '24h',
        }
      );

      Logger.info(`User logged in: ${user.username} (${user.email})`);

      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      Logger.error('Login error', error);
      throw error;
    }
  }
}

module.exports = AuthService;