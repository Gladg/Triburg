'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var knittingPrograms = require('../../app/controllers/knitting-programs.server.controller');

	// Knitting programs Routes
	app.route('/knitting-programs')
		.get(knittingPrograms.list)
		.post(users.requiresLogin, knittingPrograms.create);

	app.route('/knitting-programs/:knittingProgramId')
		.get(knittingPrograms.read)
		.put(users.requiresLogin, knittingPrograms.hasAuthorization, knittingPrograms.update)
		.delete(users.requiresLogin, knittingPrograms.hasAuthorization, knittingPrograms.delete);

	// Finish by binding the Knitting program middleware
	app.param('knittingProgramId', knittingPrograms.knittingProgramByID);
};
