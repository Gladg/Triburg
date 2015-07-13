'use strict';

//Knitting program fabric details service used to communicate Knitting program fabric details REST endpoints
angular.module('knitting-program-fabric-details').factory('KnittingProgramFabricDetails', ['$resource',
	function($resource) {
		return $resource('knitting-program-fabric-details/:knittingProgramFabricDetailId', { knittingProgramFabricDetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);