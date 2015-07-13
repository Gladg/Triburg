'use strict';

//Yarn purchase orders service used to communicate Yarn purchase orders REST endpoints
angular.module('yarn-purchase-orders').factory('YarnPurchaseOrders', ['$resource',
	function($resource) {
		return $resource('yarn-purchase-orders/:yarnPurchaseOrderId', { yarnPurchaseOrderId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);