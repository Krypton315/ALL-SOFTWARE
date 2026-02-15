const express = require("express");
const logger = require("./logger");

const app = express();
app.use(express.json()); // agar bisa baca body JSON

// ================= REGISTER =================
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  logger.info(`Register attempt username=${username} IP=${req.ip}`);

  if (!username || !password) {
    logger.warning("Register gagal: data tidak lengkap");
    return res.status(400).json({ message: "Username dan password wajib" });
  }

  // simulasi berhasil
  logger.info(`Register berhasil username=${username}`);
  res.json({ message: "Register berhasil" });
});

// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  logger.info(`Login attempt username=${username} IP=${req.ip}`);

  if (username !== "admin" || password !== "123") {
    logger.warning(`Login gagal username=${username}`);
    return res.status(401).json({ message: "Login gagal" });
  }

  logger.info(`Login berhasil username=${username}`);
  res.json({ message: "Login berhasil" });
});

// ================= SERVER =================
app.listen(3000, () => {
  logger.info("Server running di port 3000");
});
