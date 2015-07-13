'use strict';

//Costing sheets service used to communicate Costing sheets REST endpoints
angular.module('costing-sheets').factory('CostingSheets', ['$resource',
	function($resource) {
		return $resource('costing-sheets/:costingSheetId', { costingSheetId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);