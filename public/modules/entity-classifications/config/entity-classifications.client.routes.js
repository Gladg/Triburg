'use strict';

//Setting up route
angular.module('entity-classifications').config(['$stateProvider',
	function($stateProvider) {
		// Entity classifications state routing
		$stateProvider.
		state('listEntityClassifications', {
			url: '/entity-classifications',
			templateUrl: 'modules/entity-classifications/views/list-entity-classifications.client.view.html'
		}).
		state('createEntityClassification', {
			url: '/entity-classifications/create',
			templateUrl: 'modules/entity-classifications/views/create-entity-classification.client.view.html'
		}).
		state('viewEntityClassification', {
			url: '/entity-classifications/:entityClassificationId',
			templateUrl: 'modules/entity-classifications/views/view-entity-classification.client.view.html'
		}).
		state('editEntityClassification', {
			url: '/entity-classifications/:entityClassificationId/edit',
			templateUrl: 'modules/entity-classifications/views/edit-entity-classification.client.view.html'
		});
	}
]);