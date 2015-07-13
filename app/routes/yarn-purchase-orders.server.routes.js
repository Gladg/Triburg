'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var yarnPurchaseOrders = require('../../app/controllers/yarn-purchase-orders.server.controller');

	// Yarn purchase orders Routes
	app.route('/yarn-purchase-orders')
		.get(yarnPurchaseOrders.list)
		.post(users.requiresLogin, yarnPurchaseOrders.create);

	app.route('/yarn-purchase-orders/:yarnPurchaseOrderId')
		.get(yarnPurchaseOrders.read)
		.put(users.requiresLogin, yarnPurchaseOrders.hasAuthorization, yarnPurchaseOrders.update)
		.delete(users.requiresLogin, yarnPurchaseOrders.hasAuthorization, yarnPurchaseOrders.delete);

	// Finish by binding the Yarn purchase order middleware
	app.param('yarnPurchaseOrderId', yarnPurchaseOrders.yarnPurchaseOrderByID);
};
