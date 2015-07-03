'use strict';

//Setting up route
angular.module('order-enquiry-forms').config(['$stateProvider',
	function($stateProvider) {
		// Order enquiry forms state routing
		$stateProvider.
		state('listOrderEnquiryForms', {
			url: '/order-enquiry-forms',
			templateUrl: 'modules/order-enquiry-forms/views/list-order-enquiry-forms.client.view.html'
		}).
		state('createOrderEnquiryForm', {
			url: '/order-enquiry-forms/create',
			templateUrl: 'modules/order-enquiry-forms/views/create-order-enquiry-form.client.view.html'
		}).
		state('viewOrderEnquiryForm', {
			url: '/order-enquiry-forms/:orderEnquiryFormId',
			templateUrl: 'modules/order-enquiry-forms/views/view-order-enquiry-form.client.view.html'
		}).
		state('editOrderEnquiryForm', {
			url: '/order-enquiry-forms/:orderEnquiryFormId/edit',
			templateUrl: 'modules/order-enquiry-forms/views/edit-order-enquiry-form.client.view.html'
		});
	}
]);