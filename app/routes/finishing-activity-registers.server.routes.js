'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var finishingActivityRegisters = require('../../app/controllers/finishing-activity-registers.server.controller');

	// Finishing activity registers Routes
	app.route('/finishing-activity-registers')
		.get(finishingActivityRegisters.list)
		.post(users.requiresLogin, finishingActivityRegisters.create);

	app.route('/finishing-activity-registers/:finishingActivityRegisterId')
		.get(finishingActivityRegisters.read)
		.put(users.requiresLogin, finishingActivityRegisters.hasAuthorization, finishingActivityRegisters.update)
		.delete(users.requiresLogin, finishingActivityRegisters.hasAuthorization, finishingActivityRegisters.delete);

	// Finish by binding the Finishing activity register middleware
	app.param('finishingActivityRegisterId', finishingActivityRegisters.finishingActivityRegisterByID);
};
