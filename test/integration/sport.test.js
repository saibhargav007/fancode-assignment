const request = require("supertest");
const { app } = require("../../app");
const { tours, sports, matches } = require("../mock/mockData");
const { getAllSportsToursAndMatches } = require("./utils");
const {
	constructAllSportsToursAndMatches,
} = require("../../src/controllers/utils");
const { closeServer, startServerAndCleanUp } = require("./utils");

describe("GET '/sport/tour/match", () => {
	beforeAll(startServerAndCleanUp);
	afterAll(closeServer);

	it("should return all sports,tours,matches for GET request to ('/sport/tour/match", async () => {
		const response = await request(app).get("/sport/tour/match");

		const expectedResult = constructAllSportsToursAndMatches(
			getAllSportsToursAndMatches(matches, tours, sports)
		);
		expect(response.status).toBe(200);
		expect(response.body).toEqual(expectedResult);
	});
});
