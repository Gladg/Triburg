'use strict';

// Configuring the Articles module
angular.module('order-planning-activity-details').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Order planning activity details', 'order-planning-activity-details', 'dropdown', '/order-planning-activity-details(/create)?');
		Menus.addSubMenuItem('topbar', 'order-planning-activity-details', 'List Order planning activity details', 'order-planning-activity-details');
		Menus.addSubMenuItem('topbar', 'order-planning-activity-details', 'New Order planning activity detail', 'order-planning-activity-details/create');
	}
]);