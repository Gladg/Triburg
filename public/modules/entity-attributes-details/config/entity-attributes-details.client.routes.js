'use strict';

//Setting up route
angular.module('entity-attributes-details').config(['$stateProvider',
	function($stateProvider) {
		// Entity attributes details state routing
		$stateProvider.
		state('listEntityAttributesDetails', {
			url: '/entity-attributes-details',
			templateUrl: 'modules/entity-attributes-details/views/list-entity-attributes-details.client.view.html'
		}).
		state('createEntityAttributesDetail', {
			url: '/entity-attributes-details/create',
			templateUrl: 'modules/entity-attributes-details/views/create-entity-attributes-detail.client.view.html'
		}).
		state('viewEntityAttributesDetail', {
			url: '/entity-attributes-details/:entityAttributesDetailId',
			templateUrl: 'modules/entity-attributes-details/views/view-entity-attributes-detail.client.view.html'
		}).
		state('editEntityAttributesDetail', {
			url: '/entity-attributes-details/:entityAttributesDetailId/edit',
			templateUrl: 'modules/entity-attributes-details/views/edit-entity-attributes-detail.client.view.html'
		});
	}
]);