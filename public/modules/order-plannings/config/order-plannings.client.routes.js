'use strict';

//Setting up route
angular.module('order-plannings').config(['$stateProvider',
	function($stateProvider) {
		// Order plannings state routing
		$stateProvider.
		state('listOrderPlannings', {
			url: '/order-plannings',
			templateUrl: 'modules/order-plannings/views/list-order-plannings.client.view.html'
		}).
		state('createOrderPlanning', {
			url: '/order-plannings/create',
			templateUrl: 'modules/order-plannings/views/create-order-planning.client.view.html'
		}).
		state('viewOrderPlanning', {
			url: '/order-plannings/:orderPlanningId',
			templateUrl: 'modules/order-plannings/views/view-order-planning.client.view.html'
		}).
		state('editOrderPlanning', {
			url: '/order-plannings/:orderPlanningId/edit',
			templateUrl: 'modules/order-plannings/views/edit-order-planning.client.view.html'
		});
	}
]);