const request = require("supertest");
const { app } = require("../../app");
const { tours } = require("../mock/mockData");
const { closeServer, startServerAndCleanUp } = require("./utils");

describe("GET /tours", () => {
	beforeAll(startServerAndCleanUp);
	afterAll(closeServer);

	it("should return all tours for GET request to /tours", async () => {
		const response = await request(app).get("/tours");
		expect(response.status).toBe(200);
		const toursResult = response.body.map((tour) => {
			return {
				id: tour.id,
				name: tour.name,
				sportId: tour.sportId,
				status: tour.status ? true : false,
				startTime: tour.startTime,
				endTime: tour.endTime,
			};
		});

		const toursData = tours.map((tour) => {
			return {
				...tour,
				startTime: new Date(tour.startTime).toISOString(),
				endTime: new Date(tour.endTime).toISOString(),
			};
		});

		expect(toursResult).toEqual(toursData);
	});
});

describe("GET /tour/matches", () => {
	beforeAll(startServerAndCleanUp);
	afterAll(closeServer);

	it("should return matches for a given tour name", async () => {
		const response = await request(app)
			.get("/tour/matches")
			.query({ name: "Premier League" });

		expect(response.status).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
		expect(response.body.length).toBeGreaterThan(0);
	});

	it("should throw an error when name is not provided", async () => {
		const response = await request(app)
			.get("/tour/matches")
			.query({ name: null });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error.message).toBe(
			"Missing required parameter: name"
		);
	});
});
