const Tour = require("../models/tour");

const getAllTours = async () => {
	return await Tour.getAllTours();
};

const getMatchesByTourName = async (params) => {
	const { name } = params;
	if (!name) {
		const error = new Error("Missing required parameter: name");
		error.statusCode = 400;
		throw error;
	}

	return await Tour.getMatchesByTourName(params);
};

module.exports = {
	getAllTours: getAllTours,
	getMatchesByTourName: getMatchesByTourName,
};
