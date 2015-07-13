'use strict';

//Machinery equipment lists service used to communicate Machinery equipment lists REST endpoints
angular.module('machinery-equipment-lists').factory('MachineryEquipmentLists', ['$resource',
	function($resource) {
		return $resource('machinery-equipment-lists/:machineryEquipmentListId', { machineryEquipmentListId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);