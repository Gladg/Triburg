'use strict';

//Setting up route
angular.module('order-registration-delivery-details').config(['$stateProvider',
	function($stateProvider) {
		// Order registration delivery details state routing
		$stateProvider.
		state('listOrderRegistrationDeliveryDetails', {
			url: '/order-registration-delivery-details',
			templateUrl: 'modules/order-registration-delivery-details/views/list-order-registration-delivery-details.client.view.html'
		}).
		state('createOrderRegistrationDeliveryDetail', {
			url: '/order-registration-delivery-details/create',
			templateUrl: 'modules/order-registration-delivery-details/views/create-order-registration-delivery-detail.client.view.html'
		}).
		state('viewOrderRegistrationDeliveryDetail', {
			url: '/order-registration-delivery-details/:orderRegistrationDeliveryDetailId',
			templateUrl: 'modules/order-registration-delivery-details/views/view-order-registration-delivery-detail.client.view.html'
		}).
		state('editOrderRegistrationDeliveryDetail', {
			url: '/order-registration-delivery-details/:orderRegistrationDeliveryDetailId/edit',
			templateUrl: 'modules/order-registration-delivery-details/views/edit-order-registration-delivery-detail.client.view.html'
		});
	}
]);