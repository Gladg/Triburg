'use strict';

//Setting up route
angular.module('order-planning-activity-details').config(['$stateProvider',
	function($stateProvider) {
		// Order planning activity details state routing
		$stateProvider.
		state('listOrderPlanningActivityDetails', {
			url: '/order-planning-activity-details',
			templateUrl: 'modules/order-planning-activity-details/views/list-order-planning-activity-details.client.view.html'
		}).
		state('createOrderPlanningActivityDetail', {
			url: '/order-planning-activity-details/create',
			templateUrl: 'modules/order-planning-activity-details/views/create-order-planning-activity-detail.client.view.html'
		}).
		state('viewOrderPlanningActivityDetail', {
			url: '/order-planning-activity-details/:orderPlanningActivityDetailId',
			templateUrl: 'modules/order-planning-activity-details/views/view-order-planning-activity-detail.client.view.html'
		}).
		state('editOrderPlanningActivityDetail', {
			url: '/order-planning-activity-details/:orderPlanningActivityDetailId/edit',
			templateUrl: 'modules/order-planning-activity-details/views/edit-order-planning-activity-detail.client.view.html'
		});
	}
]);