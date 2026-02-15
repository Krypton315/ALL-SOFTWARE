// ====================================
// AUTH ROUTES
// ====================================

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// POST /auth/register - Register user baru
router.post('/register', AuthController.register);

// POST /auth/login - Login user
router.post('/login', AuthController.login);

module.exports = router;