'use strict';

//Setting up route
angular.module('entity-classification-details').config(['$stateProvider',
	function($stateProvider) {
		// Entity classification details state routing
		$stateProvider.
		state('listEntityClassificationDetails', {
			url: '/entity-classification-details',
			templateUrl: 'modules/entity-classification-details/views/list-entity-classification-details.client.view.html'
		}).
		state('createEntityClassificationDetail', {
			url: '/entity-classification-details/create',
			templateUrl: 'modules/entity-classification-details/views/create-entity-classification-detail.client.view.html'
		}).
		state('viewEntityClassificationDetail', {
			url: '/entity-classification-details/:entityClassificationDetailId',
			templateUrl: 'modules/entity-classification-details/views/view-entity-classification-detail.client.view.html'
		}).
		state('editEntityClassificationDetail', {
			url: '/entity-classification-details/:entityClassificationDetailId/edit',
			templateUrl: 'modules/entity-classification-details/views/edit-entity-classification-detail.client.view.html'
		});
	}
]);