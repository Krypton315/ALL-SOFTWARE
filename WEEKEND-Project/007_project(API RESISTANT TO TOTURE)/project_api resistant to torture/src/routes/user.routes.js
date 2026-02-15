// ====================================
// USER ROUTES
// ====================================

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const verifyToken = require('../middleware/auth.middleware');

// Semua route user memerlukan authentication
router.use(verifyToken);

// GET /users/:id - Get user by ID
router.get('/:id', UserController.getUserById);

// GET /users - Get all users dengan pagination dan search
router.get('/', UserController.getUsers);

module.exports = router;