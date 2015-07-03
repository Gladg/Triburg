'use strict';

//Order enquiry forms service used to communicate Order enquiry forms REST endpoints
angular.module('order-enquiry-forms').factory('OrderEnquiryForms', ['$resource',
	function($resource) {
		return $resource('order-enquiry-forms/:orderEnquiryFormId', { orderEnquiryFormId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);