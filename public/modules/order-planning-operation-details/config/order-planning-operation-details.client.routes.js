'use strict';

//Setting up route
angular.module('order-planning-operation-details').config(['$stateProvider',
	function($stateProvider) {
		// Order planning operation details state routing
		$stateProvider.
		state('listOrderPlanningOperationDetails', {
			url: '/order-planning-operation-details',
			templateUrl: 'modules/order-planning-operation-details/views/list-order-planning-operation-details.client.view.html'
		}).
		state('createOrderPlanningOperationDetail', {
			url: '/order-planning-operation-details/create',
			templateUrl: 'modules/order-planning-operation-details/views/create-order-planning-operation-detail.client.view.html'
		}).
		state('viewOrderPlanningOperationDetail', {
			url: '/order-planning-operation-details/:orderPlanningOperationDetailId',
			templateUrl: 'modules/order-planning-operation-details/views/view-order-planning-operation-detail.client.view.html'
		}).
		state('editOrderPlanningOperationDetail', {
			url: '/order-planning-operation-details/:orderPlanningOperationDetailId/edit',
			templateUrl: 'modules/order-planning-operation-details/views/edit-order-planning-operation-detail.client.view.html'
		});
	}
]);