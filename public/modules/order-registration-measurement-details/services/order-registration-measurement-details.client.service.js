'use strict';

//Order registration measurement details service used to communicate Order registration measurement details REST endpoints
angular.module('order-registration-measurement-details').factory('OrderRegistrationMeasurementDetails', ['$resource',
	function($resource) {
		return $resource('order-registration-measurement-details/:orderRegistrationMeasurementDetailId', { orderRegistrationMeasurementDetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);