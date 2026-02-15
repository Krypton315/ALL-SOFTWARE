const express = require("express");
const pool = require("./db");

const app = express();

app.get("/users", async (req, res) => {
  try {
    // ambil query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    // total data
    const totalResult = await pool.query(
      "SELECT COUNT(*) FROM users"
    );
    const totalData = parseInt(totalResult.rows[0].count);
    const totalPage = Math.ceil(totalData / limit);

    // data per halaman
    const users = await pool.query(
      `SELECT id, name, email, role
       FROM users
       ORDER BY id
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    res.json({
      page,
      limit,
      total_data: totalData,
      total_page: totalPage,
      data: users.rows,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
