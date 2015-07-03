'use strict';

//Knitting programs service used to communicate Knitting programs REST endpoints
angular.module('knitting-programs').factory('KnittingPrograms', ['$resource',
	function($resource) {
		return $resource('knitting-programs/:knittingProgramId', { knittingProgramId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);