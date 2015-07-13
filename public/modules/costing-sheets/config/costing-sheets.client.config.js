'use strict';

// Configuring the Articles module
angular.module('costing-sheets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Costing sheets', 'costing-sheets', 'dropdown', '/costing-sheets(/create)?');
		Menus.addSubMenuItem('topbar', 'costing-sheets', 'List Costing sheets', 'costing-sheets');
		Menus.addSubMenuItem('topbar', 'costing-sheets', 'New Costing sheet', 'costing-sheets/create');
	}
]);