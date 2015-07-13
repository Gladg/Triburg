'use strict';

//Order planning activity details service used to communicate Order planning activity details REST endpoints
angular.module('order-planning-activity-details').factory('OrderPlanningActivityDetails', ['$resource',
	function($resource) {
		return $resource('order-planning-activity-details/:orderPlanningActivityDetailId', { orderPlanningActivityDetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);