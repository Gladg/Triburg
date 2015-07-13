'use strict';

//Setting up route
angular.module('packing-lists').config(['$stateProvider',
	function($stateProvider) {
		// Packing lists state routing
		$stateProvider.
		state('listPackingLists', {
			url: '/packing-lists',
			templateUrl: 'modules/packing-lists/views/list-packing-lists.client.view.html'
		}).
		state('createPackingList', {
			url: '/packing-lists/create',
			templateUrl: 'modules/packing-lists/views/create-packing-list.client.view.html'
		}).
		state('viewPackingList', {
			url: '/packing-lists/:packingListId',
			templateUrl: 'modules/packing-lists/views/view-packing-list.client.view.html'
		}).
		state('editPackingList', {
			url: '/packing-lists/:packingListId/edit',
			templateUrl: 'modules/packing-lists/views/edit-packing-list.client.view.html'
		});
	}
]);