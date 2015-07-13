'use strict';

// Configuring the Articles module
angular.module('order-plannings').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Order plannings', 'order-plannings', 'dropdown', '/order-plannings(/create)?');
		Menus.addSubMenuItem('topbar', 'order-plannings', 'List Order plannings', 'order-plannings');
		Menus.addSubMenuItem('topbar', 'order-plannings', 'New Order planning', 'order-plannings/create');
	}
]);