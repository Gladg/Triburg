'use strict';

// Configuring the Articles module
angular.module('delivery-challans').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Delivery challans', 'delivery-challans', 'dropdown', '/delivery-challans(/create)?');
		Menus.addSubMenuItem('topbar', 'delivery-challans', 'List Delivery challans', 'delivery-challans');
		Menus.addSubMenuItem('topbar', 'delivery-challans', 'New Delivery challan', 'delivery-challans/create');
	}
]);