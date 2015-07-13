'use strict';

//Setting up route
angular.module('program-sheets').config(['$stateProvider',
	function($stateProvider) {
		// Program sheets state routing
		$stateProvider.
		state('listProgramSheets', {
			url: '/program-sheets',
			templateUrl: 'modules/program-sheets/views/list-program-sheets.client.view.html'
		}).
		state('createProgramSheet', {
			url: '/program-sheets/create',
			templateUrl: 'modules/program-sheets/views/create-program-sheet.client.view.html'
		}).
		state('viewProgramSheet', {
			url: '/program-sheets/:programSheetId',
			templateUrl: 'modules/program-sheets/views/view-program-sheet.client.view.html'
		}).
		state('editProgramSheet', {
			url: '/program-sheets/:programSheetId/edit',
			templateUrl: 'modules/program-sheets/views/edit-program-sheet.client.view.html'
		});
	}
]);