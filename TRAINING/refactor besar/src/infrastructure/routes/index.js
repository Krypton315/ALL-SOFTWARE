// ====================================
// ROUTES INDEX
// Menggabungkan semua routes
// ====================================

const express = require('express');
const router = express.Router();

const authRoutes = require('../../modules/auth/auth.routes');
const userRoutes = require('./../modules/users/user.routes');
const adminRoutes = require('../../modules/admin/admin.routes');
const publicRoutes = require('../../modules/public/public.routes');

// Mount routes
router.use('/v1/auth', authRoutes);
router.use('/v1/users', userRoutes);
router.use('/v1/admin', adminRoutes);
router.use('/v1/public', publicRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;