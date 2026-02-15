const express = require("express");
const env = require("dotenv").config();
const jwt = require("jsonwebtoken");

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // contoh dummy (nanti dari DB)
  if (email === "admin@gmail.com" && password === "123") {
    const payload = {
      id: 1,
      email: email,
      role: "admin"
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    return res.json({
      message: "Login berhasil",
      token: token
    });
  }

  res.status(401).json({ message: "Login gagal" });
});


function authJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token tidak ada" });
  }

  const token = authHeader.split(" ")[1]; // ambil setelah Bearer

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // simpan hasil decode
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};


app.get("/dashboard", authJWT, (req, res) => {
  res.json({
    message: "Welcome dashboard",
    user: req.user
  });
});
