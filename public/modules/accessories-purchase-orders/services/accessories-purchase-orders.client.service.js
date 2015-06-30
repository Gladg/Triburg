'use strict';

//Accessories purchase orders service used to communicate Accessories purchase orders REST endpoints
angular.module('accessories-purchase-orders').factory('AccessoriesPurchaseOrders', ['$resource',
	function($resource) {
		return $resource('accessories-purchase-orders/:accessoriesPurchaseOrderId', { accessoriesPurchaseOrderId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);