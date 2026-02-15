// ====================================
// AUTH ROUTES
// ====================================

const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const validate = require('../middleware/validation.middleware');
const { registerSchema, loginSchema } = require('../validations/auth.validation');

// POST /auth/register - Register user baru
router.post('/register', validate(registerSchema), AuthController.register);

// POST /auth/login - Login user
router.post('/login', validate(loginSchema), AuthController.login);

module.exports = router;