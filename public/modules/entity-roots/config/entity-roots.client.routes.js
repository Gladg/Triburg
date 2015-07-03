'use strict';

//Setting up route
angular.module('entity-roots').config(['$stateProvider',
	function($stateProvider) {
		// Entity roots state routing
		$stateProvider.
		state('listEntityRoots', {
			url: '/entity-roots',
			templateUrl: 'modules/entity-roots/views/list-entity-roots.client.view.html'
		}).
		state('createEntityRoot', {
			url: '/entity-roots/create',
			templateUrl: 'modules/entity-roots/views/create-entity-root.client.view.html'
		}).
		state('viewEntityRoot', {
			url: '/entity-roots/:entityRootId',
			templateUrl: 'modules/entity-roots/views/view-entity-root.client.view.html'
		}).
		state('editEntityRoot', {
			url: '/entity-roots/:entityRootId/edit',
			templateUrl: 'modules/entity-roots/views/edit-entity-root.client.view.html'
		});
	}
]);