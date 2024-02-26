const mysql = require("../lib/mysql");

const insertNews = async (title, description, matchId, tourId, sportId) => {
	const statement =
		"INSERT INTO news (title, description, matchId, tourId, sportId) VALUES (?, ?, ?, ?, ?)";
	const values = [title, description, matchId, tourId, sportId];
	await mysql.query(statement, values);
};

const selectCreatedNews = async () => {
	const selectStatement = `SELECT id, title, description FROM news WHERE id = LAST_INSERT_ID()`;
	return await mysql.query(selectStatement);
};

const createNews = async (parameters) => {
	try {
		const { title, description, matchId, tourId, sportId } = parameters;
		await insertNews(title, description, matchId, tourId, sportId);
		return await selectCreatedNews(matchId);
	} catch (error) {
		console.error("Error creating news:", error);
		throw error;
	}
};

const getNews = async (criteria, value) => {
	let statement, parameters;
	switch (criteria) {
		case "matchId":
			statement =
				"SELECT id, title, description, createdAt FROM news WHERE matchId = ?";
			break;
		case "tourId":
			statement =
				"SELECT id, title, description, createdAt FROM news WHERE tourId = ?";
			break;
		case "sportId":
			statement =
				"SELECT id, title, description, createdAt FROM news WHERE sportId = ?";
			break;
		default:
			throw new Error("Invalid criteria for fetching news.");
	}
	parameters = [value];
	try {
		const result = await mysql.query(statement, parameters);
		return result;
	} catch (error) {
		console.error("Error fetching news:", error);
		throw error;
	}
};

module.exports = {
	createNews,
	getNews,
};
