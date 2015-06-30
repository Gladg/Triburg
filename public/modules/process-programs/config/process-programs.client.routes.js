'use strict';

//Setting up route
angular.module('process-programs').config(['$stateProvider',
	function($stateProvider) {
		// Process programs state routing
		$stateProvider.
		state('listProcessPrograms', {
			url: '/process-programs',
			templateUrl: 'modules/process-programs/views/list-process-programs.client.view.html'
		}).
		state('createProcessProgram', {
			url: '/process-programs/create',
			templateUrl: 'modules/process-programs/views/create-process-program.client.view.html'
		}).
		state('viewProcessProgram', {
			url: '/process-programs/:processProgramId',
			templateUrl: 'modules/process-programs/views/view-process-program.client.view.html'
		}).
		state('editProcessProgram', {
			url: '/process-programs/:processProgramId/edit',
			templateUrl: 'modules/process-programs/views/edit-process-program.client.view.html'
		});
	}
]);