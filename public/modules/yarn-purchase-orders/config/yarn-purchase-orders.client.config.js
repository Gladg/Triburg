'use strict';

// Configuring the Articles module
angular.module('yarn-purchase-orders').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Yarn purchase orders', 'yarn-purchase-orders', 'dropdown', '/yarn-purchase-orders(/create)?');
		Menus.addSubMenuItem('topbar', 'yarn-purchase-orders', 'List Yarn purchase orders', 'yarn-purchase-orders');
		Menus.addSubMenuItem('topbar', 'yarn-purchase-orders', 'New Yarn purchase order', 'yarn-purchase-orders/create');
	}
]);