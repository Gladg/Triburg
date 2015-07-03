'use strict';

//Setting up route
angular.module('knitting-programs').config(['$stateProvider',
	function($stateProvider) {
		// Knitting programs state routing
		$stateProvider.
		state('listKnittingPrograms', {
			url: '/knitting-programs',
			templateUrl: 'modules/knitting-programs/views/list-knitting-programs.client.view.html'
		}).
		state('createKnittingProgram', {
			url: '/knitting-programs/create',
			templateUrl: 'modules/knitting-programs/views/create-knitting-program.client.view.html'
		}).
		state('viewKnittingProgram', {
			url: '/knitting-programs/:knittingProgramId',
			templateUrl: 'modules/knitting-programs/views/view-knitting-program.client.view.html'
		}).
		state('editKnittingProgram', {
			url: '/knitting-programs/:knittingProgramId/edit',
			templateUrl: 'modules/knitting-programs/views/edit-knitting-program.client.view.html'
		});
	}
]);