'use strict';

//Finishing activity registers service used to communicate Finishing activity registers REST endpoints
angular.module('finishing-activity-registers').factory('FinishingActivityRegisters', ['$resource',
	function($resource) {
		return $resource('finishing-activity-registers/:finishingActivityRegisterId', { finishingActivityRegisterId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);