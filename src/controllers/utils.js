const constructAllSportsToursAndMatches = (matches) => {
	const res = {};
	matches.forEach((match) => {
		const { sportName, tourName, ...matchDetails } = match;
		if (!res[sportName]) {
			res[sportName] = {};
		}
		if (!res[sportName][tourName]) {
			res[sportName][tourName] = [];
		}
		res[sportName][tourName].push({ ...matchDetails });
	});
	return res;
};

module.exports = {
	constructAllSportsToursAndMatches: constructAllSportsToursAndMatches,
};
