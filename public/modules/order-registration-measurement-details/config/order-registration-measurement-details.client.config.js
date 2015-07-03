'use strict';

// Configuring the Articles module
angular.module('order-registration-measurement-details').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Order registration measurement details', 'order-registration-measurement-details', 'dropdown', '/order-registration-measurement-details(/create)?');
		Menus.addSubMenuItem('topbar', 'order-registration-measurement-details', 'List Order registration measurement details', 'order-registration-measurement-details');
		Menus.addSubMenuItem('topbar', 'order-registration-measurement-details', 'New Order registration measurement detail', 'order-registration-measurement-details/create');
	}
]);