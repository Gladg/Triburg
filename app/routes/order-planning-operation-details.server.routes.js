'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var orderPlanningOperationDetails = require('../../app/controllers/order-planning-operation-details.server.controller');

	// Order planning operation details Routes
	app.route('/order-planning-operation-details')
		.get(orderPlanningOperationDetails.list)
		.post(users.requiresLogin, orderPlanningOperationDetails.create);

	app.route('/order-planning-operation-details/:orderPlanningOperationDetailId')
		.get(orderPlanningOperationDetails.read)
		.put(users.requiresLogin, orderPlanningOperationDetails.hasAuthorization, orderPlanningOperationDetails.update)
		.delete(users.requiresLogin, orderPlanningOperationDetails.hasAuthorization, orderPlanningOperationDetails.delete);

	// Finish by binding the Order planning operation detail middleware
	app.param('orderPlanningOperationDetailId', orderPlanningOperationDetails.orderPlanningOperationDetailByID);
};
