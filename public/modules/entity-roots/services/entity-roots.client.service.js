'use strict';

//Entity roots service used to communicate Entity roots REST endpoints
angular.module('entity-roots').factory('EntityRoots', ['$resource',
	function($resource) {
		return $resource('entity-roots/:entityRootId', { entityRootId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);