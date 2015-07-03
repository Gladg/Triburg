'use strict';

// Configuring the Articles module
angular.module('order-enquiry-forms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Order enquiry forms', 'order-enquiry-forms', 'dropdown', '/order-enquiry-forms(/create)?');
		Menus.addSubMenuItem('topbar', 'order-enquiry-forms', 'List Order enquiry forms', 'order-enquiry-forms');
		Menus.addSubMenuItem('topbar', 'order-enquiry-forms', 'New Order enquiry form', 'order-enquiry-forms/create');
	}
]);