// ====================================
// LOGGER UTILITY
// Logging ke console dan file
// ====================================

const fs = require('fs');
const path = require('path');

// Pastikan folder logs ada
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFile = path.join(logsDir, `app-${new Date().toISOString().split('T')[0]}.log`);

class Logger {
  /**
   * Format timestamp untuk log
   */
  static getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Write log ke file
   */
  static writeToFile(level, message, meta = {}) {
    const logEntry = {
      timestamp: this.getTimestamp(),
      level,
      message,
      ...meta,
    };

    const logString = JSON.stringify(logEntry) + '\n';
    
    fs.appendFile(logFile, logString, (err) => {
      if (err) console.error('Error writing to log file:', err);
    });
  }

  /**
   * Log level INFO
   */
  static info(message, meta = {}) {
    console.log(`[INFO] ${this.getTimestamp()} - ${message}`, meta);
    this.writeToFile('INFO', message, meta);
  }

  /**
   * Log level ERROR
   */
  static error(message, error = null) {
    const meta = error ? { error: error.message, stack: error.stack } : {};
    console.error(`[ERROR] ${this.getTimestamp()} - ${message}`, meta);
    this.writeToFile('ERROR', message, meta);
  }

  /**
   * Log level WARN
   */
  static warn(message, meta = {}) {
    console.warn(`[WARN] ${this.getTimestamp()} - ${message}`, meta);
    this.writeToFile('WARN', message, meta);
  }
}

module.exports = Logger;