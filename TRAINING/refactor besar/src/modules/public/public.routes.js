// ====================================
// PUBLIC ROUTES
// ====================================

const express = require('express');
const router = express.Router();
const PublicController = require('./public.controller');

// GET /public - Public endpoint (no auth required)
router.get('/', PublicController.getPublicData);

module.exports = router;