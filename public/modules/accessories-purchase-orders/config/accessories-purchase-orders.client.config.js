'use strict';

// Configuring the Articles module
angular.module('accessories-purchase-orders').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Accessories purchase orders', 'accessories-purchase-orders', 'dropdown', '/accessories-purchase-orders(/create)?');
		Menus.addSubMenuItem('topbar', 'accessories-purchase-orders', 'List Accessories purchase orders', 'accessories-purchase-orders');
		Menus.addSubMenuItem('topbar', 'accessories-purchase-orders', 'New Accessories purchase order', 'accessories-purchase-orders/create');
	}
]);