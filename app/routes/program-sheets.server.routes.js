'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var programSheets = require('../../app/controllers/program-sheets.server.controller');

	// Program sheets Routes
	app.route('/program-sheets')
		.get(programSheets.list)
		.post(users.requiresLogin, programSheets.create);

	app.route('/program-sheets/:programSheetId')
		.get(programSheets.read)
		.put(users.requiresLogin, programSheets.hasAuthorization, programSheets.update)
		.delete(users.requiresLogin, programSheets.hasAuthorization, programSheets.delete);

	// Finish by binding the Program sheet middleware
	app.param('programSheetId', programSheets.programSheetByID);
};
