'use strict';

//Setting up route
angular.module('order-registration-accessory-details').config(['$stateProvider',
	function($stateProvider) {
		// Order registration accessory details state routing
		$stateProvider.
		state('listOrderRegistrationAccessoryDetails', {
			url: '/order-registration-accessory-details',
			templateUrl: 'modules/order-registration-accessory-details/views/list-order-registration-accessory-details.client.view.html'
		}).
		state('createOrderRegistrationAccessoryDetail', {
			url: '/order-registration-accessory-details/create',
			templateUrl: 'modules/order-registration-accessory-details/views/create-order-registration-accessory-detail.client.view.html'
		}).
		state('viewOrderRegistrationAccessoryDetail', {
			url: '/order-registration-accessory-details/:orderRegistrationAccessoryDetailId',
			templateUrl: 'modules/order-registration-accessory-details/views/view-order-registration-accessory-detail.client.view.html'
		}).
		state('editOrderRegistrationAccessoryDetail', {
			url: '/order-registration-accessory-details/:orderRegistrationAccessoryDetailId/edit',
			templateUrl: 'modules/order-registration-accessory-details/views/edit-order-registration-accessory-detail.client.view.html'
		});
	}
]);