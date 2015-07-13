'use strict';

//Setting up route
angular.module('yarn-purchase-orders').config(['$stateProvider',
	function($stateProvider) {
		// Yarn purchase orders state routing
		$stateProvider.
		state('listYarnPurchaseOrders', {
			url: '/yarn-purchase-orders',
			templateUrl: 'modules/yarn-purchase-orders/views/list-yarn-purchase-orders.client.view.html'
		}).
		state('createYarnPurchaseOrder', {
			url: '/yarn-purchase-orders/create',
			templateUrl: 'modules/yarn-purchase-orders/views/create-yarn-purchase-order.client.view.html'
		}).
		state('viewYarnPurchaseOrder', {
			url: '/yarn-purchase-orders/:yarnPurchaseOrderId',
			templateUrl: 'modules/yarn-purchase-orders/views/view-yarn-purchase-order.client.view.html'
		}).
		state('editYarnPurchaseOrder', {
			url: '/yarn-purchase-orders/:yarnPurchaseOrderId/edit',
			templateUrl: 'modules/yarn-purchase-orders/views/edit-yarn-purchase-order.client.view.html'
		});
	}
]);