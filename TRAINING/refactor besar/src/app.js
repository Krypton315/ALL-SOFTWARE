// ====================================
// EXPRESS APPLICATION
// ====================================

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const rateLimiter = require('./middleware/rateLimiter.middleware');
const Logger = require('./utils/logger');
const ApiResponse = require('./utils/response');

const app = express();

// ====================================
// MIDDLEWARE
// ====================================

// CORS
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  Logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });
  next();
});

// Rate limiter (apply globally atau per route)
app.use(rateLimiter);

// ====================================
// ROUTES
// ====================================

app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend API with RBAC',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
      },
      public: 'GET /api/public',
      users: {
        list: 'GET /api/users',
        getById: 'GET /api/users/:id',
      },
      admin: {
        dashboard: 'GET /api/admin/dashboard',
      },
    },
  });
});

// ====================================
// ERROR HANDLING
// ====================================

// 404 handler
app.use((req, res) => {
  ApiResponse.error(res, 'Endpoint not found', 404);
});

// Global error handler
app.use((err, req, res, next) => {
  Logger.error('Unhandled error', err);
  
  ApiResponse.error(
    res,
    process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Internal server error',
    500
  );
});

module.exports = app;