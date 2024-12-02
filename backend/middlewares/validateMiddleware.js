const validate = (schema) => (req, res, next) => {
    try {
      // Validate the request body against the schema
      const parsedBody = schema.parse(req.body);
      req.body = parsedBody; // Assign validated data back to req.body
      next(); // Proceed to the next middleware or controller
    } catch (error) {
      // Format Zod validation errors
      const validationErrors = error.errors?.map((err) => ({
        path: err.path?.join('.') || 'unknown', // Join error path array for readability
        message: err.message,
      }));
  
      res.status(400).json({
        error: validationErrors || "Validation failed", // Provide validation error details
      });
    }
  };
  
  module.exports = { validate };
  