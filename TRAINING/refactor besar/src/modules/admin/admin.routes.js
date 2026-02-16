// ====================================
// ADMIN ROUTES
// ====================================

const express = require('express');
const router = express.Router();
const AdminController = require('./admin.controller');
const verifyToken = require('../auth/auth.middleware');
const checkRole = require('../../infrastructure/middleware/role.middleware');

// Semua route admin memerlukan authentication dan role admin
router.use(verifyToken);
router.use(checkRole(['admin']));

// GET /admin/dashboard - Get dashboard stats
router.get('/dashboard', AdminController.getDashboard);

module.exports = router;