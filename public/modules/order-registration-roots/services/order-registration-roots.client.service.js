'use strict';

//Order registration roots service used to communicate Order registration roots REST endpoints
angular.module('order-registration-roots').factory('OrderRegistrationRoots', ['$resource',
	function($resource) {
		return $resource('order-registration-roots/:orderRegistrationRootId', { orderRegistrationRootId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);