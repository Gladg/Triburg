'use strict';

//Entity attributes details service used to communicate Entity attributes details REST endpoints
angular.module('entity-attributes-details').factory('EntityAttributesDetails', ['$resource',
	function($resource) {
		return $resource('entity-attributes-details/:entityAttributesDetailId', { entityAttributesDetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);