'use strict';

//Setting up route
angular.module('order-registration-measurement-details').config(['$stateProvider',
	function($stateProvider) {
		// Order registration measurement details state routing
		$stateProvider.
		state('listOrderRegistrationMeasurementDetails', {
			url: '/order-registration-measurement-details',
			templateUrl: 'modules/order-registration-measurement-details/views/list-order-registration-measurement-details.client.view.html'
		}).
		state('createOrderRegistrationMeasurementDetail', {
			url: '/order-registration-measurement-details/create',
			templateUrl: 'modules/order-registration-measurement-details/views/create-order-registration-measurement-detail.client.view.html'
		}).
		state('viewOrderRegistrationMeasurementDetail', {
			url: '/order-registration-measurement-details/:orderRegistrationMeasurementDetailId',
			templateUrl: 'modules/order-registration-measurement-details/views/view-order-registration-measurement-detail.client.view.html'
		}).
		state('editOrderRegistrationMeasurementDetail', {
			url: '/order-registration-measurement-details/:orderRegistrationMeasurementDetailId/edit',
			templateUrl: 'modules/order-registration-measurement-details/views/edit-order-registration-measurement-detail.client.view.html'
		});
	}
]);