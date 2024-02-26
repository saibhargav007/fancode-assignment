const express = require("express");
const helper = require("./src/lib/helper");
const { errorHandler } = require("./src/lib/errorhandler");
const app = express();

//Register routes
helper
	.fileList("./src/routes")
	.forEach((filePath) => require(`./${filePath.toString()}`)(app));

app.use(errorHandler);

module.exports = {
	app: app,
};
