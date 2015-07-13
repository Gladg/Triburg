'use strict';

//Setting up route
angular.module('machinery-equipment-lists').config(['$stateProvider',
	function($stateProvider) {
		// Machinery equipment lists state routing
		$stateProvider.
		state('listMachineryEquipmentLists', {
			url: '/machinery-equipment-lists',
			templateUrl: 'modules/machinery-equipment-lists/views/list-machinery-equipment-lists.client.view.html'
		}).
		state('createMachineryEquipmentList', {
			url: '/machinery-equipment-lists/create',
			templateUrl: 'modules/machinery-equipment-lists/views/create-machinery-equipment-list.client.view.html'
		}).
		state('viewMachineryEquipmentList', {
			url: '/machinery-equipment-lists/:machineryEquipmentListId',
			templateUrl: 'modules/machinery-equipment-lists/views/view-machinery-equipment-list.client.view.html'
		}).
		state('editMachineryEquipmentList', {
			url: '/machinery-equipment-lists/:machineryEquipmentListId/edit',
			templateUrl: 'modules/machinery-equipment-lists/views/edit-machinery-equipment-list.client.view.html'
		});
	}
]);