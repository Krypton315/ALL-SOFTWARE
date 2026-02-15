const express = require("express");
const app = express();
const pool = require("./db");

const userRoutes = require("./routes/users");

app.use("/api", userRoutes);

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
