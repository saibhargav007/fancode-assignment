const News = require("../controllers/news");
const express = require("express");

module.exports = function (app) {
	app.use(express.json());
	app.route("/news/match").post(async (req, res, next) => {
		try {
			let params = req.body;
			const createdNews = await News.createNewsForMatch(params);
			return res.json(createdNews);
		} catch (err) {
			return next(err);
		}
	});

	app.route("/news/tour").post(async (req, res, next) => {
		try {
			let params = req.body;
			return res.json(await News.createNewsForTour(params));
		} catch (err) {
			return next(err);
		}
	});

	app.route("/news/match").get(async (req, res, next) => {
		try {
			let params = req.query;
			return res.json(await News.getNewsForMatch(params));
		} catch (err) {
			return next(err);
		}
	});

	app.route("/news/tour").get(async (req, res, next) => {
		try {
			let params = req.query;
			return res.json(await News.getNewsForTour(params));
		} catch (err) {
			return next(err);
		}
	});

	app.route("/news/sport").get(async (req, res, next) => {
		try {
			let params = req.query;
			return res.json(await News.getNewsForSport(params));
		} catch (err) {
			return next(err);
		}
	});
};
