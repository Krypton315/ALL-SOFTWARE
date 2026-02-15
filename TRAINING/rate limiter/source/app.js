const express = require("express");
const rateLimiter = require("./rateLimiter");

const app = express();

// pasang rate limiter
app.use(rateLimiter);

app.get("/", (req, res) => {
  res.send("Hello, rate limiting aktif!");
});

app.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});
