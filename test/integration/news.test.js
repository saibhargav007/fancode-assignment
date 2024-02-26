const request = require("supertest");
const { app } = require("../../app");
const { query } = require("../../src/lib/mysql");
const { closeServer, startServerAndCleanUp } = require("./utils");

describe("POST /news/match", () => {
	beforeAll(startServerAndCleanUp);
	afterAll(closeServer);

	it("should create news for match", async () => {
		const response = await request(app)
			.post("/news/match")
			.send({ description: "Description", matchId: 1, title: "Title" });

		expect(response.status).toBe(200);
		expect(response.body[0]).toHaveProperty("title", "Title");
		expect(response.body[0]).toHaveProperty("description", "Description");
		expect(response.body[0]).toHaveProperty("matchId", 1);
	});

	it("should not create news for match if matchId is not present", async () => {
		const response = await request(app)
			.post("/news/match")
			.send({ description: "Description", matchId: 4, title: "Title" });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error.message).toBe(
			"There is no match with the given matchId."
		);
	});

	it("should return 400 Bad Request if title is null", async () => {
		const response = await request(app)
			.post("/news/match")
			.send({ description: "Description", matchId: 1 });
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error.message).toBe("title should not be empty.");
	});

	it("should return 400 Bad Request if description is null", async () => {
		const response = await request(app)
			.post("/news/match")
			.send({ title: "Title", matchId: 1 });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error.message).toBe(
			"description should not be empty."
		);
	});

	it("should return 400 Bad Request if matchId is null", async () => {
		const response = await request(app)
			.post("/news/match")
			.send({ title: "Title", description: "Description" });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error.message).toBe("matchId should not be empty.");
	});
});

describe("POST /news/tour", () => {
	beforeAll(startServerAndCleanUp);
	afterAll(closeServer);

	it("should create news for match", async () => {
		const response = await request(app)
			.post("/news/tour")
			.send({ description: "Description", tourId: 1, title: "Title" });

		expect(response.status).toBe(200);
		expect(response.body[0]).toHaveProperty("title", "Title");
		expect(response.body[0]).toHaveProperty("description", "Description");
		expect(response.body[0]).toHaveProperty("tourId", 1);
	});

	it("should not create news for tour if tourId is not present", async () => {
		const response = await request(app)
			.post("/news/tour")
			.send({ description: "Description", tourId: 4, title: "Title" });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error.message).toBe(
			"There is no tour with the given tourId."
		);
	});

	it("should return 400 Bad Request if title is null", async () => {
		const response = await request(app)
			.post("/news/tour")
			.send({ description: "Description", tourId: 1 });
		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error.message).toBe("title should not be empty.");
	});

	it("should return 400 Bad Request if description is null", async () => {
		const response = await request(app)
			.post("/news/tour")
			.send({ title: "Title", tourId: 1 });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error.message).toBe(
			"description should not be empty."
		);
	});

	it("should return 400 Bad Request if tourId is null", async () => {
		const response = await request(app)
			.post("/news/tour")
			.send({ title: "Title", description: "Description" });

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error.message).toBe("tourId should not be empty.");
	});
});

describe("GET /news/match", () => {
	beforeAll(async () => {
		await startServerAndCleanUp();
		await request(app).post("/news/match").send({
			description: "Test Description",
			matchId: 1,
			title: "Test Title",
		});
	});

	afterAll(closeServer);

	it("should return news for the given matchId", async () => {
		const response = await request(app)
			.get("/news/match")
			.query({ matchId: 1 });

		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(1);
		expect(response.body[0]).toHaveProperty("title", "Test Title");
		expect(response.body[0]).toHaveProperty("description", "Test Description");
	});

	it("should throw an error if matchId is empty", async () => {
		const response = await request(app).get("/news/match").query({});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error.message).toBe("matchId should not be empty.");
	});
});

describe("GET /news/tour", () => {
	beforeAll(async () => {
		await startServerAndCleanUp();
		await request(app).post("/news/match").send({
			description: "Match News  Description",
			matchId: 1,
			title: "Match News Title",
		});
		await request(app).post("/news/tour").send({
			description: "Tour News Description",
			tourId: 1,
			title: "Tour News Title",
		});
	});

	afterAll(closeServer);

	it("should return news for the given tourId", async () => {
		const response = await request(app).get("/news/tour").query({ tourId: 1 });

		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(2);
	});

	it("should throw an error if tourId is empty", async () => {
		const response = await request(app).get("/news/tour").query({});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error.message).toBe("tourId should not be empty.");
	});
});

describe("GET /news/sport", () => {
	beforeAll(async () => {
		await startServerAndCleanUp();
		await request(app).post("/news/tour").send({
			description: "Tour News Description",
			tourId: 1,
			title: "Tour News Title",
		});
	});

	afterAll(closeServer);

	it("should return news for the given sportId", async () => {
		const response = await request(app)
			.get("/news/sport")
			.query({ sportId: 1 });

		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(1);
		expect(response.body[0]).toHaveProperty("title", "Tour News Title");
		expect(response.body[0]).toHaveProperty(
			"description",
			"Tour News Description"
		);
	});

	it("should throw an error if sportId is empty", async () => {
		const response = await request(app).get("/news/sport").query({});

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("error");
		expect(response.body.error.message).toBe("sportId should not be empty.");
	});
});
