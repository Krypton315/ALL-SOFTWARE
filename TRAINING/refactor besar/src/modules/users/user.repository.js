// modules/users/user.repository.js

const db = require('../../infrastructure/config/database');

class UserRepository {
  // =============================
  // FIND METHODS
  // =============================

  async findAll() {
    const result = await db.query(
      `SELECT id, username, email, role_id, is_active, created_at
       FROM users
       ORDER BY created_at DESC`
    );

    return result.rows;
  }

  async findById(id) {
    const result = await db.query(
      `SELECT id, username, email, role, created_at
       FROM users
       WHERE id = $1`,
      [id]
    );

    return result.rows[0] || null;
  }

  async findByEmail(email) {
    const result = await db.query(
      `SELECT *
       FROM users
       WHERE email = $1`,
      [email]
    );

    return result.rows[0] || null;
  }

  // =============================
  // CREATE
  // =============================

  async create(data) {
    const result = await db.query(
      `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role, created_at`,
      [data.name, data.email, data.password, data.role]
    );

    return result.rows[0];
  }

  // =============================
  // UPDATE
  // =============================

  async update(id, data) {
    const result = await db.query(
      `UPDATE users
       SET name = $1,
           email = $2,
           role = $3,
           updated_at = NOW()
       WHERE id = $4
       RETURNING id, name, email, role, updated_at`,
      [data.name, data.email, data.role, id]
    );

    return result.rows[0] || null;
  }

  // =============================
  // DELETE
  // =============================

  async delete(id) {
    const result = await db.query(
      `DELETE FROM users
       WHERE id = $1
       RETURNING id`,
      [id]
    );

    return result.rows[0] || null;
  }
}

module.exports = new UserRepository();
