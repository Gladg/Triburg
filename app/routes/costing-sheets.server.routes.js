'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var costingSheets = require('../../app/controllers/costing-sheets.server.controller');

	// Costing sheets Routes
	app.route('/costing-sheets')
		.get(costingSheets.list)
		.post(users.requiresLogin, costingSheets.create);

	app.route('/costing-sheets/:costingSheetId')
		.get(costingSheets.read)
		.put(users.requiresLogin, costingSheets.hasAuthorization, costingSheets.update)
		.delete(users.requiresLogin, costingSheets.hasAuthorization, costingSheets.delete);

	// Finish by binding the Costing sheet middleware
	app.param('costingSheetId', costingSheets.costingSheetByID);
};
