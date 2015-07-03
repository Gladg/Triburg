'use strict';

// Configuring the Articles module
angular.module('order-registration-delivery-details').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Order registration delivery details', 'order-registration-delivery-details', 'dropdown', '/order-registration-delivery-details(/create)?');
		Menus.addSubMenuItem('topbar', 'order-registration-delivery-details', 'List Order registration delivery details', 'order-registration-delivery-details');
		Menus.addSubMenuItem('topbar', 'order-registration-delivery-details', 'New Order registration delivery detail', 'order-registration-delivery-details/create');
	}
]);