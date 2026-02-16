// ====================================
// AUTH ROUTES
// ====================================

const express = require('express');
const router = express.Router();
const AuthController = require('./auth.controller');
const validate = require('../../infrastructure/middleware/validation.middleware');
const { registerSchema, loginSchema } = require('./auth.validation');

// POST /auth/register - Register user baru
router.post('/register', validate(registerSchema), AuthController.register);

// POST /auth/login - Login user
router.post('/login', validate(loginSchema), AuthController.login);

module.exports = router;