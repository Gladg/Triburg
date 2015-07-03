'use strict';

// Configuring the Articles module
angular.module('cutting-registers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Cutting registers', 'cutting-registers', 'dropdown', '/cutting-registers(/create)?');
		Menus.addSubMenuItem('topbar', 'cutting-registers', 'List Cutting registers', 'cutting-registers');
		Menus.addSubMenuItem('topbar', 'cutting-registers', 'New Cutting register', 'cutting-registers/create');
	}
]);