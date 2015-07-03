'use strict';

//Cutting registers service used to communicate Cutting registers REST endpoints
angular.module('cutting-registers').factory('CuttingRegisters', ['$resource',
	function($resource) {
		return $resource('cutting-registers/:cuttingRegisterId', { cuttingRegisterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);