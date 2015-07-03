'use strict';

//Setting up route
angular.module('cutting-registers').config(['$stateProvider',
	function($stateProvider) {
		// Cutting registers state routing
		$stateProvider.
		state('listCuttingRegisters', {
			url: '/cutting-registers',
			templateUrl: 'modules/cutting-registers/views/list-cutting-registers.client.view.html'
		}).
		state('createCuttingRegister', {
			url: '/cutting-registers/create',
			templateUrl: 'modules/cutting-registers/views/create-cutting-register.client.view.html'
		}).
		state('viewCuttingRegister', {
			url: '/cutting-registers/:cuttingRegisterId',
			templateUrl: 'modules/cutting-registers/views/view-cutting-register.client.view.html'
		}).
		state('editCuttingRegister', {
			url: '/cutting-registers/:cuttingRegisterId/edit',
			templateUrl: 'modules/cutting-registers/views/edit-cutting-register.client.view.html'
		});
	}
]);