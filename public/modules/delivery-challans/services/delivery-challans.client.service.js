'use strict';

//Delivery challans service used to communicate Delivery challans REST endpoints
angular.module('delivery-challans').factory('DeliveryChallans', ['$resource',
	function($resource) {
		return $resource('delivery-challans/:deliveryChallanId', { deliveryChallanId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);