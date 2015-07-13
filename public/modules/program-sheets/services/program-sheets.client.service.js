'use strict';

//Program sheets service used to communicate Program sheets REST endpoints
angular.module('program-sheets').factory('ProgramSheets', ['$resource',
	function($resource) {
		return $resource('program-sheets/:programSheetId', { programSheetId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);