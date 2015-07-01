'use strict';

//Setting up route
angular.module('order-registration-roots').config(['$stateProvider',
	function($stateProvider) {
		// Order registration roots state routing
		$stateProvider.
		state('listOrderRegistrationRoots', {
			url: '/order-registration-roots',
			templateUrl: 'modules/order-registration-roots/views/list-order-registration-roots.client.view.html'
		}).
		state('createOrderRegistrationRoot', {
			url: '/order-registration-roots/create',
			templateUrl: 'modules/order-registration-roots/views/create-order-registration-root.client.view.html'
		}).
		state('viewOrderRegistrationRoot', {
			url: '/order-registration-roots/:orderRegistrationRootId',
			templateUrl: 'modules/order-registration-roots/views/view-order-registration-root.client.view.html'
		}).
		state('editOrderRegistrationRoot', {
			url: '/order-registration-roots/:orderRegistrationRootId/edit',
			templateUrl: 'modules/order-registration-roots/views/edit-order-registration-root.client.view.html'
		});
	}
]);