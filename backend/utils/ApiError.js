class ApiError extends Error {
    /**
     * @param {number} statusCode - HTTP status code of the error.
     * @param {string} message - Error message.
     */
    constructor(statusCode, message) {
        super(message); // Set the message property from the parent Error class
        this.statusCode = statusCode; // Custom property for HTTP status code

        // Ensure the name of this error is the class name
        this.name = this.constructor.name;

        // Captures the stack trace (useful for debugging)
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;
