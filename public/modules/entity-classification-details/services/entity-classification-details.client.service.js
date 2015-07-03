'use strict';

//Entity classification details service used to communicate Entity classification details REST endpoints
angular.module('entity-classification-details').factory('EntityClassificationDetails', ['$resource',
	function($resource) {
		return $resource('entity-classification-details/:entityClassificationDetailId', { entityClassificationDetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);