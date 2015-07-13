'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var knittingProgramFabricDetails = require('../../app/controllers/knitting-program-fabric-details.server.controller');

	// Knitting program fabric details Routes
	app.route('/knitting-program-fabric-details')
		.get(knittingProgramFabricDetails.list)
		.post(users.requiresLogin, knittingProgramFabricDetails.create);

	app.route('/knitting-program-fabric-details/:knittingProgramFabricDetailId')
		.get(knittingProgramFabricDetails.read)
		.put(users.requiresLogin, knittingProgramFabricDetails.hasAuthorization, knittingProgramFabricDetails.update)
		.delete(users.requiresLogin, knittingProgramFabricDetails.hasAuthorization, knittingProgramFabricDetails.delete);

	// Finish by binding the Knitting program fabric detail middleware
	app.param('knittingProgramFabricDetailId', knittingProgramFabricDetails.knittingProgramFabricDetailByID);
};
