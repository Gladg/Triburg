'use strict';

//Order registration size color details service used to communicate Order registration size color details REST endpoints
angular.module('order-registration-size-color-details').factory('OrderRegistrationSizeColorDetails', ['$resource',
	function($resource) {
		return $resource('order-registration-size-color-details/:orderRegistrationSizeColorDetailId', { orderRegistrationSizeColorDetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);