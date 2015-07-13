'use strict';

// Configuring the Articles module
angular.module('program-sheets').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Program sheets', 'program-sheets', 'dropdown', '/program-sheets(/create)?');
		Menus.addSubMenuItem('topbar', 'program-sheets', 'List Program sheets', 'program-sheets');
		Menus.addSubMenuItem('topbar', 'program-sheets', 'New Program sheet', 'program-sheets/create');
	}
]);