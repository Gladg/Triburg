'use strict';

//Order plannings service used to communicate Order plannings REST endpoints
angular.module('order-plannings').factory('OrderPlannings', ['$resource',
	function($resource) {
		return $resource('order-plannings/:orderPlanningId', { orderPlanningId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);