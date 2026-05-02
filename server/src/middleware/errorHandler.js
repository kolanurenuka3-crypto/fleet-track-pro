const logger = require('../utils/logger');

// Central error handler — ALL errors funnel here
const errorHandler = (err, req, res, next) => {
  logger.error(`${err.message} | Route: ${req.originalUrl}`);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Only show stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

// Custom error class — use this everywhere instead of plain Error
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { errorHandler, AppError };