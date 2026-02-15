const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "training",
  password: "789",
  database: "pagination",
  port: 5432,
});

module.exports = pool;
