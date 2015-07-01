'use strict';

//Setting up route
angular.module('order-registration-size-color-details').config(['$stateProvider',
	function($stateProvider) {
		// Order registration size color details state routing
		$stateProvider.
		state('listOrderRegistrationSizeColorDetails', {
			url: '/order-registration-size-color-details',
			templateUrl: 'modules/order-registration-size-color-details/views/list-order-registration-size-color-details.client.view.html'
		}).
		state('createOrderRegistrationSizeColorDetail', {
			url: '/order-registration-size-color-details/create',
			templateUrl: 'modules/order-registration-size-color-details/views/create-order-registration-size-color-detail.client.view.html'
		}).
		state('viewOrderRegistrationSizeColorDetail', {
			url: '/order-registration-size-color-details/:orderRegistrationSizeColorDetailId',
			templateUrl: 'modules/order-registration-size-color-details/views/view-order-registration-size-color-detail.client.view.html'
		}).
		state('editOrderRegistrationSizeColorDetail', {
			url: '/order-registration-size-color-details/:orderRegistrationSizeColorDetailId/edit',
			templateUrl: 'modules/order-registration-size-color-details/views/edit-order-registration-size-color-detail.client.view.html'
		});
	}
]);