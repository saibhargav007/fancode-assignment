const mysql = require("mysql2");
const config = require("../../config/config");

const pool = mysql.createPool({
	host: config.database.host,
	user: config.database.username,
	password: config.database.password,
	database: config.database.database,
	port: config.database.port,
});

function query(sql, args) {
	return new Promise((resolve, reject) => {
		pool.query(sql, args, (err, rows) => {
			if (err) return reject(err);
			resolve(rows);
		});
	});
}

/**
 * Checks the connection to the MySQL database.
 * @param {number} maxAttempts - The maximum number of attempts to connect.
 * @returns {Promise<void>} - A promise that resolves if the connection is successful, or rejects if it fails after the maximum attempts.
 */
function checkMySQLConnection(maxAttempts) {
	return new Promise((resolve, reject) => {
		let attempt = 1;

		function tryConnect() {
			console.log(`Attempt ${attempt} to connect to MySQL...`);
			pool.query("SELECT 1", (error, results) => {
				if (error) {
					if (attempt < maxAttempts) {
						attempt++;
						setTimeout(tryConnect, 3000); // Retry after 3 seconds
					} else {
						reject(
							new Error(
								`Failed to connect to MySQL after ${maxAttempts} attempts`
							)
						);
					}
				} else {
					console.log("Connected to MySQL database");
					resolve();
				}
			});
		}

		// Start the connection attempt
		tryConnect();
	});
}

module.exports = {
	query,
	checkMySQLConnection,
};
