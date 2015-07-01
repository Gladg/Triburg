'use strict';

//Entity classifications service used to communicate Entity classifications REST endpoints
angular.module('entity-classifications').factory('EntityClassifications', ['$resource',
	function($resource) {
		return $resource('entity-classifications/:entityClassificationId', { entityClassificationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);