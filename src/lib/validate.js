/**
 * Validates the presence of required parameters in the provided object.
 * @param {object} params - The object containing parameters to validate.
 * @param {string[]} requiredParams - An array of required parameter names.
 * @throws {Error} - Throws an error if any of the required parameters are missing.
 */
const validateParams = (params, requiredParams) => {
	for (const param of requiredParams) {
		if (!params[param]) {
			const error = new Error(`${param} should not be empty.`);
			error.statusCode = 400;
			throw error;
		}
	}
};

module.exports = { validateParams };
