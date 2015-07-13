'use strict';

//Order planning operation details service used to communicate Order planning operation details REST endpoints
angular.module('order-planning-operation-details').factory('OrderPlanningOperationDetails', ['$resource',
	function($resource) {
		return $resource('order-planning-operation-details/:orderPlanningOperationDetailId', { orderPlanningOperationDetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);