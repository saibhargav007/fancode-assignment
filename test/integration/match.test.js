const request = require("supertest");
const { app } = require("../../app");
const { matches } = require("../mock/mockData");
const { closeServer, startServerAndCleanUp } = require("./utils");

describe("GET /matches", () => {
	beforeAll(startServerAndCleanUp);
	afterAll(closeServer);

	it("should return all matches for GET request to /matches", async () => {
		const response = await request(app).get("/matches");
		const matchesResult = response.body.map((match) => {
			return {
				id: match.id,
				name: match.name,
				tourId: match.tourId,
				status: match.status ? true : false,
				format: match.format,
				startTime: match.startTime,
				endTime: match.endTime,
			};
		});

		const matchesData = matches.map((match) => {
			return {
				...match,
				startTime: new Date(match.startTime).toISOString(),
				endTime: new Date(match.endTime).toISOString(),
			};
		});
		expect(response.status).toBe(200);
		expect(matchesResult).toEqual(matchesData);
	});
});
