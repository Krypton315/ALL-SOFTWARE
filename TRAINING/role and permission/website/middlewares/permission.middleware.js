const pool = require("../db");

module.exports = (permission) => {
  return async (req, res, next) => {
    const roleId = req.user.role_id;

    const result = await pool.query(`
      SELECT p.name FROM permissions p
      JOIN role_permissions rp ON rp.permission_id = p.id
      WHERE rp.role_id = $1
    `, [roleId]);

    const permissions = result.rows.map(p => p.name);

    if (!permissions.includes(permission))
      return res.sendStatus(403);

    next();
  };
};
