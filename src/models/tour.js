const mysql = require("../lib/mysql");

const getAllTours = async () => {
	const statement = "select * from tours;";
	const parameters = [];
	return await mysql.query(statement, parameters);
};

const getMatchesByTourName = async (params) => {
	const statement =
		"select * from matches where tourId IN (SELECT id FROM tours WHERE name = ?)";
	const parameters = [params.name];
	return await mysql.query(statement, parameters);
};

const getSportIdByTourId = async (params) => {
	const statement = "select sportId from tours where id = ?";
	const parameters = [params.tourId];
	return await mysql.query(statement, parameters);
};

const checkIfTourExits = async (params) => {
	const statement = "select * from tours where id = ?";
	const parameters = [params.tourId];
	const tourDetails = await mysql.query(statement, parameters);
	if (!tourDetails.length) {
		return false;
	}
	return true;
};

module.exports = {
	getAllTours,
	getMatchesByTourName,
	getSportIdByTourId,
	checkIfTourExits,
};
