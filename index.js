const { app } = require("./app");
const config = require("./config/config");
const { checkMySQLConnection } = require("./src/lib/mysql");

const port = config.server.port;

function startServer() {
	app.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
}

/**
 * Initializes the server by checking the MySQL connection and starting the server.
 * If the MySQL connection fails, it logs an error and exits the process.
 */
async function initServer() {
	try {
		await checkMySQLConnection(20);
		startServer();
	} catch (error) {
		console.error("Failed to connect to MySQL:", error);
		process.exit(1);
	}
}

(async () => {
	try {
		await initServer();
	} catch (error) {
		console.error("Failed to initialize server:", error);
		process.exit(1);
	}
})();
