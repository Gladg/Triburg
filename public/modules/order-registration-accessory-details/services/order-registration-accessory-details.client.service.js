'use strict';

//Order registration accessory details service used to communicate Order registration accessory details REST endpoints
angular.module('order-registration-accessory-details').factory('OrderRegistrationAccessoryDetails', ['$resource',
	function($resource) {
		return $resource('order-registration-accessory-details/:orderRegistrationAccessoryDetailId', { orderRegistrationAccessoryDetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);