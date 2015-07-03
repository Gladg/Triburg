'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var deliveryChallans = require('../../app/controllers/delivery-challans.server.controller');

	// Delivery challans Routes
	app.route('/delivery-challans')
		.get(deliveryChallans.list)
		.post(users.requiresLogin, deliveryChallans.create);

	app.route('/delivery-challans/:deliveryChallanId')
		.get(deliveryChallans.read)
		.put(users.requiresLogin, deliveryChallans.hasAuthorization, deliveryChallans.update)
		.delete(users.requiresLogin, deliveryChallans.hasAuthorization, deliveryChallans.delete);

	// Finish by binding the Delivery challan middleware
	app.param('deliveryChallanId', deliveryChallans.deliveryChallanByID);
};
