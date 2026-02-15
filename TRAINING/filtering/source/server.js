const express = require("express");
const pool = require("./db");

const app = express();

app.get("/users", async (req, res) => {
  try {
    const { role, status, search } = req.query;

    let query = "SELECT * FROM users WHERE 1=1";
    let values = [];

    if (role) {
      values.push(role);
      query += ` AND role = $${values.length}`;
    }

    if (status) {
      values.push(status);
      query += ` AND status = $${values.length}`;
    }

    if (search) {
      values.push(`%${search}%`);
      query += ` AND name ILIKE $${values.length}`;
    }

    const result = await pool.query(query, values);

    res.json({
      total: result.rowCount,
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server Is Running On Port 3000");
});
