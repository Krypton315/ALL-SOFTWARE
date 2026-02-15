// ====================================
// SERVER ENTRY POINT
// ====================================

const app = require('./app');
const { pool } = require('./config/database');
const Logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;

// Start server
const server = app.listen(PORT, () => {
  Logger.info(`🚀 Server running on port ${PORT}`);
  Logger.info(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  Logger.info(`🔗 API URL: http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  Logger.info('SIGTERM signal received: closing HTTP server');
  
  server.close(() => {
    Logger.info('HTTP server closed');
    
    pool.end(() => {
      Logger.info('Database pool closed');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  Logger.info('SIGINT signal received: closing HTTP server');
  
  server.close(() => {
    Logger.info('HTTP server closed');
    
    pool.end(() => {
      Logger.info('Database pool closed');
      process.exit(0);
    });
  });
});

// Unhandled rejection
process.on('unhandledRejection', (reason, promise) => {
  Logger.error('Unhandled Rejection at:', { promise, reason });
});