'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var orderRegistrationMeasurementDetails = require('../../app/controllers/order-registration-measurement-details.server.controller');

	// Order registration measurement details Routes
	app.route('/order-registration-measurement-details')
		.get(orderRegistrationMeasurementDetails.list)
		.post(users.requiresLogin, orderRegistrationMeasurementDetails.create);

	app.route('/order-registration-measurement-details/:orderRegistrationMeasurementDetailId')
		.get(orderRegistrationMeasurementDetails.read)
		.put(users.requiresLogin, orderRegistrationMeasurementDetails.hasAuthorization, orderRegistrationMeasurementDetails.update)
		.delete(users.requiresLogin, orderRegistrationMeasurementDetails.hasAuthorization, orderRegistrationMeasurementDetails.delete);

	// Finish by binding the Order registration measurement detail middleware
	app.param('orderRegistrationMeasurementDetailId', orderRegistrationMeasurementDetails.orderRegistrationMeasurementDetailByID);
};
