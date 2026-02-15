const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password, role_id } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (username, email, password, role_id) VALUES ($1,$2,$3,$4)",
    [username, email, hashed, role_id]
  );

  res.json({ message: "Register berhasil" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const userRes = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (userRes.rowCount === 0)
    return res.status(401).json({ message: "User tidak ditemukan" });

  const user = userRes.rows[0];

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(401).json({ message: "Password salah" });

  const token = jwt.sign(
    { id: user.id, role_id: user.role_id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
};
