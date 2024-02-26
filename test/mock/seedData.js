const { query } = require("../../src/lib/mysql");
const { matches, sports, tours } = require("./mockData");
const mysql = require("mysql2");

const seedMockData = async () => {
	try {
		for (const sport of sports) {
			await query("INSERT  INTO sports (id , name, status) VALUES (?,?,?)", [
				sport.id,
				sport.name,
				sport.status,
			]);
		}

		console.log("sport seeding data completed");

		for (const tour of tours) {
			await query(
				"INSERT  INTO tours (id , name, sportId, status, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?)",
				[
					tour.id,
					tour.name,
					tour.sportId,
					tour.status,
					tour.startTime,
					tour.endTime,
				]
			);
		}

		console.log("tour seeding data completed");

		for (const match of matches) {
			await query(
				"INSERT  INTO matches (id, name, tourId, status, format, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?, ?)",
				[
					match.id,
					match.name,
					match.tourId,
					match.status,
					match.format,
					match.startTime,
					match.endTime,
				]
			);
		}

		console.log("match seeding data completed");
	} catch (error) {
		throw new Error(
			`Failed to seed mock data into the database: ${error.message}`
		);
	}
};

const cleanUpSeededData = async () => {
	try {
		await query("DELETE FROM matches");
		await query("DELETE FROM tours");
		await query("DELETE FROM sports");
		await query("DELETE FROM news");

		console.log("cleaning data completed");
	} catch (error) {
		console.error("Error cleaning up seeded data:", error);
	}
};

module.exports = {
	seedMockData,
	cleanUpSeededData,
};
