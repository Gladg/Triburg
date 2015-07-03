'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var orderRegistrationAccessoryDetails = require('../../app/controllers/order-registration-accessory-details.server.controller');

	// Order registration accessory details Routes
	app.route('/order-registration-accessory-details')
		.get(orderRegistrationAccessoryDetails.list)
		.post(users.requiresLogin, orderRegistrationAccessoryDetails.create);

	app.route('/order-registration-accessory-details/:orderRegistrationAccessoryDetailId')
		.get(orderRegistrationAccessoryDetails.read)
		.put(users.requiresLogin, orderRegistrationAccessoryDetails.hasAuthorization, orderRegistrationAccessoryDetails.update)
		.delete(users.requiresLogin, orderRegistrationAccessoryDetails.hasAuthorization, orderRegistrationAccessoryDetails.delete);

	// Finish by binding the Order registration accessory detail middleware
	app.param('orderRegistrationAccessoryDetailId', orderRegistrationAccessoryDetails.orderRegistrationAccessoryDetailByID);
};
