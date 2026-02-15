const express = require("express");
const router = express.Router();
const pool = require("../db");
const { setCache, getCache } = require("../cache");

router.get("/users", async (req, res) => {
  const cacheKey = "users_list";

  const cachedData = getCache(cacheKey);
  if (cachedData) {
    return res.json({
      source: "cache",
      data: cachedData
    });
  }
  
  const database = await pool.query("SELECT * FROM users");
  const users = database.rows;

  // simpan ke cache selama 30 detik
  setCache(cacheKey, users, 30);

  res.json({
    source: "database",
    data: users
  });
});

module.exports = router;
