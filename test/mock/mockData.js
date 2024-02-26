const sports = [
	{ id: 1, name: "Football", status: true },
	{ id: 2, name: "Basketball", status: true },
	{ id: 3, name: "Tennis", status: true },
];

const tours = [
	{
		id: 1,
		name: "Premier League",
		sportId: 1,
		status: true,
		startTime: "2024-01-01 00:00:00",
		endTime: "2024-05-31 23:59:59",
	},
	{
		id: 2,
		name: "NBA Season",
		sportId: 2,
		status: true,
		startTime: "2024-01-01 00:00:00",
		endTime: "2024-06-30 23:59:59",
	},
	{
		id: 3,
		name: "Grand Slam",
		sportId: 3,
		status: true,
		startTime: "2024-01-01 00:00:00",
		endTime: "2024-12-31 23:59:59",
	},
];

const matches = [
	{
		id: 1,
		name: "Manchester United vs Liverpool",
		tourId: 1,
		status: true,
		format: "Football",
		startTime: "2024-01-01 12:00:00",
		endTime: "2024-01-01 14:00:00",
	},
	{
		id: 2,
		name: "Los Angeles Lakers vs Brooklyn Nets",
		tourId: 2,
		status: true,
		format: "Basketball",
		startTime: "2024-01-01 18:00:00",
		endTime: "2024-01-01 20:00:00",
	},
	{
		id: 3,
		name: "Wimbledon Final",
		tourId: 3,
		status: true,
		format: "Tennis",
		startTime: "2024-07-01 14:00:00",
		endTime: "2024-07-01 16:00:00",
	},
];

module.exports = {
	sports,
	tours,
	matches,
};
