'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var orderPlanningActivityDetails = require('../../app/controllers/order-planning-activity-details.server.controller');

	// Order planning activity details Routes
	app.route('/order-planning-activity-details')
		.get(orderPlanningActivityDetails.list)
		.post(users.requiresLogin, orderPlanningActivityDetails.create);

	app.route('/order-planning-activity-details/:orderPlanningActivityDetailId')
		.get(orderPlanningActivityDetails.read)
		.put(users.requiresLogin, orderPlanningActivityDetails.hasAuthorization, orderPlanningActivityDetails.update)
		.delete(users.requiresLogin, orderPlanningActivityDetails.hasAuthorization, orderPlanningActivityDetails.delete);

	// Finish by binding the Order planning activity detail middleware
	app.param('orderPlanningActivityDetailId', orderPlanningActivityDetails.orderPlanningActivityDetailByID);
};
