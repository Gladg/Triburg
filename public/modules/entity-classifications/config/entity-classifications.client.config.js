'use strict';

// Configuring the Articles module
angular.module('entity-classifications').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Entity classifications', 'entity-classifications', 'dropdown', '/entity-classifications(/create)?');
		Menus.addSubMenuItem('topbar', 'entity-classifications', 'List Entity classifications', 'entity-classifications');
		Menus.addSubMenuItem('topbar', 'entity-classifications', 'New Entity classification', 'entity-classifications/create');
	}
]);