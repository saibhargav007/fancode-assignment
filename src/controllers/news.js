const News = require("../models/news");
const Match = require("../models/match");
const Tour = require("../models/tour");

const { validateParams } = require("../lib/validate");

/**
 * Creates news for a match based on provided parameters.
 * @param {object} params - The object containing parameters for creating news.
 * @throws {Error} - Throws an error if required parameters are missing or if the match related to matchId doesn't exist.
 * @returns {Promise<object>} - A promise resolving to the created news object.
 */
const createNewsForMatch = async (params) => {
	const requiredParams = ["title", "description", "matchId"];
	validateParams(params, requiredParams);

	// Check if the match exists based on the provided matchId
	const isMatchPresent = await Match.checkIfMatchExits({
		matchId: params.matchId,
	});

	if (!isMatchPresent) {
		const error = new Error("There is no match with the given matchId.");
		error.statusCode = 400;
		throw error;
	}

	// Retrieve the tourId associated with the match
	const { tourId } = (await Match.getTourIdByMatchId(params))[0];
	return await News.createNews({ ...params, tourId, sportId: null });
};

/**
 * Creates news for a tour based on provided parameters.
 * @param {object} params - The object containing parameters for creating news.
 * @throws {Error} - Throws an error if required parameters are missing or if the tour related to tourId doesn't exist.
 * @returns {Promise<object>} - A promise resolving to the created news object.
 */
const createNewsForTour = async (params) => {
	const requiredParams = ["title", "description", "tourId"];
	validateParams(params, requiredParams);

	// Check if the tour exists based on the provided tourId
	const isTourPresent = await Tour.checkIfTourExits({ tourId: params.tourId });
	if (!isTourPresent) {
		const error = new Error("There is no tour with the given tourId.");
		error.statusCode = 400;
		throw error;
	}

	// Retrieve the sportId associated with the tour
	const { sportId } = (await Tour.getSportIdByTourId(params))[0];
	return await News.createNews({ ...params, matchId: null, sportId });
};

const getNewsForMatch = async (params) => {
	validateParams(params, ["matchId"]);
	return await News.getNews("matchId", params.matchId);
};

const getNewsForTour = async (params) => {
	validateParams(params, ["tourId"]);
	return await News.getNews("tourId", params.tourId);
};

const getNewsForSport = async (params) => {
	validateParams(params, ["sportId"]);
	return await News.getNews("sportId", params.sportId);
};

module.exports = {
	createNewsForMatch,
	getNewsForMatch,
	createNewsForTour,
	getNewsForTour,
	getNewsForSport,
};
