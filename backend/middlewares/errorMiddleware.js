// Handle Not Found Routes
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
  // General Error Handler
  const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
  
    res.json({
      message: err.message,
      // Include stack trace only in development mode
      stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
  };
  
  module.exports = { notFound, errorHandler };
  