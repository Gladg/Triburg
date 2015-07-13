'use strict';

// Configuring the Articles module
angular.module('packing-lists').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Packing lists', 'packing-lists', 'dropdown', '/packing-lists(/create)?');
		Menus.addSubMenuItem('topbar', 'packing-lists', 'List Packing lists', 'packing-lists');
		Menus.addSubMenuItem('topbar', 'packing-lists', 'New Packing list', 'packing-lists/create');
	}
]);