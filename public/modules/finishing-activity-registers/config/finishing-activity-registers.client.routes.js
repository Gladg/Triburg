'use strict';

//Setting up route
angular.module('finishing-activity-registers').config(['$stateProvider',
	function($stateProvider) {
		// Finishing activity registers state routing
		$stateProvider.
		state('listFinishingActivityRegisters', {
			url: '/finishing-activity-registers',
			templateUrl: 'modules/finishing-activity-registers/views/list-finishing-activity-registers.client.view.html'
		}).
		state('createFinishingActivityRegister', {
			url: '/finishing-activity-registers/create',
			templateUrl: 'modules/finishing-activity-registers/views/create-finishing-activity-register.client.view.html'
		}).
		state('viewFinishingActivityRegister', {
			url: '/finishing-activity-registers/:finishingActivityRegisterId',
			templateUrl: 'modules/finishing-activity-registers/views/view-finishing-activity-register.client.view.html'
		}).
		state('editFinishingActivityRegister', {
			url: '/finishing-activity-registers/:finishingActivityRegisterId/edit',
			templateUrl: 'modules/finishing-activity-registers/views/edit-finishing-activity-register.client.view.html'
		});
	}
]);