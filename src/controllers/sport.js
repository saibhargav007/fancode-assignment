const Sport = require("../models/sport");
const { constructAllSportsToursAndMatches } = require("./utils");

const getAllSportsToursAndMatches = async () => {
	const matches = await Sport.getAllSportsToursAndMatches();
	return constructAllSportsToursAndMatches(matches);
};

module.exports = {
	getAllSportsToursAndMatches: getAllSportsToursAndMatches,
};
