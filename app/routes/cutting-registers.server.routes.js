'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var cuttingRegisters = require('../../app/controllers/cutting-registers.server.controller');

	// Cutting registers Routes
	app.route('/cutting-registers')
		.get(cuttingRegisters.list)
		.post(users.requiresLogin, cuttingRegisters.create);

	app.route('/cutting-registers/:cuttingRegisterId')
		.get(cuttingRegisters.read)
		.put(users.requiresLogin, cuttingRegisters.hasAuthorization, cuttingRegisters.update)
		.delete(users.requiresLogin, cuttingRegisters.hasAuthorization, cuttingRegisters.delete);

	// Finish by binding the Cutting register middleware
	app.param('cuttingRegisterId', cuttingRegisters.cuttingRegisterByID);
};
