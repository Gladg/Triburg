'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var orderRegistrationSizeColorDetails = require('../../app/controllers/order-registration-size-color-details.server.controller');

	// Order registration size color details Routes
	app.route('/order-registration-size-color-details')
		.get(orderRegistrationSizeColorDetails.list)
		.post(users.requiresLogin, orderRegistrationSizeColorDetails.create);

	app.route('/order-registration-size-color-details/:orderRegistrationSizeColorDetailId')
		.get(orderRegistrationSizeColorDetails.read)
		.put(users.requiresLogin, orderRegistrationSizeColorDetails.hasAuthorization, orderRegistrationSizeColorDetails.update)
		.delete(users.requiresLogin, orderRegistrationSizeColorDetails.hasAuthorization, orderRegistrationSizeColorDetails.delete);

	// Finish by binding the Order registration size color detail middleware
	app.param('orderRegistrationSizeColorDetailId', orderRegistrationSizeColorDetails.orderRegistrationSizeColorDetailByID);
};
