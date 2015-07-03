'use strict';

// Configuring the Articles module
angular.module('order-registration-accessory-details').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Order registration accessory details', 'order-registration-accessory-details', 'dropdown', '/order-registration-accessory-details(/create)?');
		Menus.addSubMenuItem('topbar', 'order-registration-accessory-details', 'List Order registration accessory details', 'order-registration-accessory-details');
		Menus.addSubMenuItem('topbar', 'order-registration-accessory-details', 'New Order registration accessory detail', 'order-registration-accessory-details/create');
	}
]);