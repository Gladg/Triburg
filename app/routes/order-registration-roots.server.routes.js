'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var orderRegistrationRoots = require('../../app/controllers/order-registration-roots.server.controller');

	// Order registration roots Routes
	app.route('/order-registration-roots')
		.get(orderRegistrationRoots.list)
		.post(users.requiresLogin, orderRegistrationRoots.create);

	app.route('/order-registration-roots/:orderRegistrationRootId')
		.get(orderRegistrationRoots.read)
		.put(users.requiresLogin, orderRegistrationRoots.hasAuthorization, orderRegistrationRoots.update)
		.delete(users.requiresLogin, orderRegistrationRoots.hasAuthorization, orderRegistrationRoots.delete);

	// Finish by binding the Order registration root middleware
	app.param('orderRegistrationRootId', orderRegistrationRoots.orderRegistrationRootByID);
};
