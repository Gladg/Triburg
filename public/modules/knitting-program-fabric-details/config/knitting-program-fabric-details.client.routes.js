'use strict';

//Setting up route
angular.module('knitting-program-fabric-details').config(['$stateProvider',
	function($stateProvider) {
		// Knitting program fabric details state routing
		$stateProvider.
		state('listKnittingProgramFabricDetails', {
			url: '/knitting-program-fabric-details',
			templateUrl: 'modules/knitting-program-fabric-details/views/list-knitting-program-fabric-details.client.view.html'
		}).
		state('createKnittingProgramFabricDetail', {
			url: '/knitting-program-fabric-details/create',
			templateUrl: 'modules/knitting-program-fabric-details/views/create-knitting-program-fabric-detail.client.view.html'
		}).
		state('viewKnittingProgramFabricDetail', {
			url: '/knitting-program-fabric-details/:knittingProgramFabricDetailId',
			templateUrl: 'modules/knitting-program-fabric-details/views/view-knitting-program-fabric-detail.client.view.html'
		}).
		state('editKnittingProgramFabricDetail', {
			url: '/knitting-program-fabric-details/:knittingProgramFabricDetailId/edit',
			templateUrl: 'modules/knitting-program-fabric-details/views/edit-knitting-program-fabric-detail.client.view.html'
		});
	}
]);