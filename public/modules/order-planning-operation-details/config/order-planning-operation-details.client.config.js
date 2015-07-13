'use strict';

// Configuring the Articles module
angular.module('order-planning-operation-details').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Order planning operation details', 'order-planning-operation-details', 'dropdown', '/order-planning-operation-details(/create)?');
		Menus.addSubMenuItem('topbar', 'order-planning-operation-details', 'List Order planning operation details', 'order-planning-operation-details');
		Menus.addSubMenuItem('topbar', 'order-planning-operation-details', 'New Order planning operation detail', 'order-planning-operation-details/create');
	}
]);