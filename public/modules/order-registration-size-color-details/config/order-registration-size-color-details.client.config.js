'use strict';

// Configuring the Articles module
angular.module('order-registration-size-color-details').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Order registration size color details', 'order-registration-size-color-details', 'dropdown', '/order-registration-size-color-details(/create)?');
		Menus.addSubMenuItem('topbar', 'order-registration-size-color-details', 'List Order registration size color details', 'order-registration-size-color-details');
		Menus.addSubMenuItem('topbar', 'order-registration-size-color-details', 'New Order registration size color detail', 'order-registration-size-color-details/create');
	}
]);