'use strict';

//Setting up route
angular.module('accessories-purchase-orders').config(['$stateProvider',
	function($stateProvider) {
		// Accessories purchase orders state routing
		$stateProvider.
		state('listAccessoriesPurchaseOrders', {
			url: '/accessories-purchase-orders',
			templateUrl: 'modules/accessories-purchase-orders/views/list-accessories-purchase-orders.client.view.html'
		}).
		state('createAccessoriesPurchaseOrder', {
			url: '/accessories-purchase-orders/create',
			templateUrl: 'modules/accessories-purchase-orders/views/create-accessories-purchase-order.client.view.html'
		}).
		state('viewAccessoriesPurchaseOrder', {
			url: '/accessories-purchase-orders/:accessoriesPurchaseOrderId',
			templateUrl: 'modules/accessories-purchase-orders/views/view-accessories-purchase-order.client.view.html'
		}).
		state('editAccessoriesPurchaseOrder', {
			url: '/accessories-purchase-orders/:accessoriesPurchaseOrderId/edit',
			templateUrl: 'modules/accessories-purchase-orders/views/edit-accessories-purchase-order.client.view.html'
		});
	}
]);