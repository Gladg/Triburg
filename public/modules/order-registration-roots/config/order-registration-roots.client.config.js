'use strict';

// Configuring the Articles module
angular.module('order-registration-roots').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Order registration roots', 'order-registration-roots', 'dropdown', '/order-registration-roots(/create)?');
		Menus.addSubMenuItem('topbar', 'order-registration-roots', 'List Order registration roots', 'order-registration-roots');
		Menus.addSubMenuItem('topbar', 'order-registration-roots', 'New Order registration root', 'order-registration-roots/create');
	}
]);