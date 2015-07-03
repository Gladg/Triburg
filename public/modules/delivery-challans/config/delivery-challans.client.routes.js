'use strict';

//Setting up route
angular.module('delivery-challans').config(['$stateProvider',
	function($stateProvider) {
		// Delivery challans state routing
		$stateProvider.
		state('listDeliveryChallans', {
			url: '/delivery-challans',
			templateUrl: 'modules/delivery-challans/views/list-delivery-challans.client.view.html'
		}).
		state('createDeliveryChallan', {
			url: '/delivery-challans/create',
			templateUrl: 'modules/delivery-challans/views/create-delivery-challan.client.view.html'
		}).
		state('viewDeliveryChallan', {
			url: '/delivery-challans/:deliveryChallanId',
			templateUrl: 'modules/delivery-challans/views/view-delivery-challan.client.view.html'
		}).
		state('editDeliveryChallan', {
			url: '/delivery-challans/:deliveryChallanId/edit',
			templateUrl: 'modules/delivery-challans/views/edit-delivery-challan.client.view.html'
		});
	}
]);