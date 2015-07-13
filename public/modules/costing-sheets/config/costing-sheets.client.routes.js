'use strict';

//Setting up route
angular.module('costing-sheets').config(['$stateProvider',
	function($stateProvider) {
		// Costing sheets state routing
		$stateProvider.
		state('listCostingSheets', {
			url: '/costing-sheets',
			templateUrl: 'modules/costing-sheets/views/list-costing-sheets.client.view.html'
		}).
		state('createCostingSheet', {
			url: '/costing-sheets/create',
			templateUrl: 'modules/costing-sheets/views/create-costing-sheet.client.view.html'
		}).
		state('viewCostingSheet', {
			url: '/costing-sheets/:costingSheetId',
			templateUrl: 'modules/costing-sheets/views/view-costing-sheet.client.view.html'
		}).
		state('editCostingSheet', {
			url: '/costing-sheets/:costingSheetId/edit',
			templateUrl: 'modules/costing-sheets/views/edit-costing-sheet.client.view.html'
		});
	}
]);