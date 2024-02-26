/**
 * errorHandler - Express middleware for handling errors
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const errorHandler = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		error: {
			message: err.message || "Internal Server Error",
		},
	});
};

module.exports = {
	errorHandler,
};
