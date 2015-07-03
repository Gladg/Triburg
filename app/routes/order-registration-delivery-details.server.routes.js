'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var orderRegistrationDeliveryDetails = require('../../app/controllers/order-registration-delivery-details.server.controller');

	// Order registration delivery details Routes
	app.route('/order-registration-delivery-details')
		.get(orderRegistrationDeliveryDetails.list)
		.post(users.requiresLogin, orderRegistrationDeliveryDetails.create);

	app.route('/order-registration-delivery-details/:orderRegistrationDeliveryDetailId')
		.get(orderRegistrationDeliveryDetails.read)
		.put(users.requiresLogin, orderRegistrationDeliveryDetails.hasAuthorization, orderRegistrationDeliveryDetails.update)
		.delete(users.requiresLogin, orderRegistrationDeliveryDetails.hasAuthorization, orderRegistrationDeliveryDetails.delete);

	// Finish by binding the Order registration delivery detail middleware
	app.param('orderRegistrationDeliveryDetailId', orderRegistrationDeliveryDetails.orderRegistrationDeliveryDetailByID);
};
