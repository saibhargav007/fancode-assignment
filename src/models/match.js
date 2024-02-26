const mysql = require("../lib/mysql");

const getAllMatches = async () => {
	const statement = "select * from matches;";
	const parameters = [];
	return await mysql.query(statement, parameters);
};

const getTourIdByMatchId = async (params) => {
	const statement = "select tourId from matches where id = ?";
	const parameters = [params.matchId];
	return await mysql.query(statement, parameters);
};

const checkIfMatchExits = async (params) => {
	const statement = "select * from matches where id = ?";
	const parameters = [params.matchId];
	const matchDetails = await mysql.query(statement, parameters);
	if (!matchDetails.length) {
		return false;
	}

	return true;
};

module.exports = {
	getAllMatches: getAllMatches,
	getTourIdByMatchId: getTourIdByMatchId,
	checkIfMatchExits: checkIfMatchExits,
};
