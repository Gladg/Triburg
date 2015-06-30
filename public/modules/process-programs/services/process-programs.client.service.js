'use strict';

//Process programs service used to communicate Process programs REST endpoints
angular.module('process-programs').factory('ProcessPrograms', ['$resource',
	function($resource) {
		return $resource('process-programs/:processProgramId', { processProgramId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);