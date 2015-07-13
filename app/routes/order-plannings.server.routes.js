'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var orderPlannings = require('../../app/controllers/order-plannings.server.controller');

	// Order plannings Routes
	app.route('/order-plannings')
		.get(orderPlannings.list)
		.post(users.requiresLogin, orderPlannings.create);

	app.route('/order-plannings/:orderPlanningId')
		.get(orderPlannings.read)
		.put(users.requiresLogin, orderPlannings.hasAuthorization, orderPlannings.update)
		.delete(users.requiresLogin, orderPlannings.hasAuthorization, orderPlannings.delete);

	// Finish by binding the Order planning middleware
	app.param('orderPlanningId', orderPlannings.orderPlanningByID);
};
