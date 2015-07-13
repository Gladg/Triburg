'use strict';

//Packing lists service used to communicate Packing lists REST endpoints
angular.module('packing-lists').factory('PackingLists', ['$resource',
	function($resource) {
		return $resource('packing-lists/:packingListId', { packingListId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);