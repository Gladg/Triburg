'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var processPrograms = require('../../app/controllers/process-programs.server.controller');

	// Process programs Routes
	app.route('/process-programs')
		.get(processPrograms.list)
		.post(users.requiresLogin, processPrograms.create);

	app.route('/process-programs/:processProgramId')
		.get(processPrograms.read)
		.put(users.requiresLogin, processPrograms.hasAuthorization, processPrograms.update)
		.delete(users.requiresLogin, processPrograms.hasAuthorization, processPrograms.delete);

	// Finish by binding the Process program middleware
	app.param('processProgramId', processPrograms.processProgramByID);
};
