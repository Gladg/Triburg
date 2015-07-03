'use strict';

//Order registration delivery details service used to communicate Order registration delivery details REST endpoints
angular.module('order-registration-delivery-details').factory('OrderRegistrationDeliveryDetails', ['$resource',
	function($resource) {
		return $resource('order-registration-delivery-details/:orderRegistrationDeliveryDetailId', { orderRegistrationDeliveryDetailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);