const { checkMySQLConnection } = require("../../src/lib/mysql");
const { app } = require("../../app");

const { cleanUpSeededData, seedMockData } = require("../mock/seedData");

const getAllSportsToursAndMatches = (matches, tours, sports) => {
	const result = [];

	matches.forEach((match) => {
		const tour = tours.find((tour) => tour.id === match.tourId);
		if (tour) {
			const sport = sports.find((sport) => sport.id === tour.sportId);
			if (sport) {
				result.push({
					sportName: sport.name,
					tourName: tour.name,
					matchName: match.name,
					matchId: match.id,
					matchStartTime: new Date(match.startTime).toISOString(),
					matchFormat: match.format,
				});
			}
		}
	});

	return result;
};

let server;
// Function to start server and perform cleanup and seed data
async function startServerAndCleanUp() {
	await checkMySQLConnection(20);
	await new Promise((resolve, reject) => {
		server = app.listen((err) => {
			if (err) {
				console.error("Error starting the server:", err);
				reject(err);
			} else {
				console.log("Server started successfully");
				resolve();
			}
		});
	});
	await cleanUpSeededData();
	await seedMockData();
}

// Function to close server
function closeServer(done) {
	server.close(done);
}

module.exports = {
	getAllSportsToursAndMatches,
	startServerAndCleanUp,
	closeServer,
};
