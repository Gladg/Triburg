'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var accessoriesPurchaseOrders = require('../../app/controllers/accessories-purchase-orders.server.controller');

	// Accessories purchase orders Routes
	app.route('/accessories-purchase-orders')
		.get(accessoriesPurchaseOrders.list)
		.post(users.requiresLogin, accessoriesPurchaseOrders.create);

	app.route('/accessories-purchase-orders/:accessoriesPurchaseOrderId')
		.get(accessoriesPurchaseOrders.read)
		.put(users.requiresLogin, accessoriesPurchaseOrders.hasAuthorization, accessoriesPurchaseOrders.update)
		.delete(users.requiresLogin, accessoriesPurchaseOrders.hasAuthorization, accessoriesPurchaseOrders.delete);

	// Finish by binding the Accessories purchase order middleware
	app.param('accessoriesPurchaseOrderId', accessoriesPurchaseOrders.accessoriesPurchaseOrderByID);
};
