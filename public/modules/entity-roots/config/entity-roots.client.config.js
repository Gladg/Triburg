'use strict';

// Configuring the Articles module
angular.module('entity-roots').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Entity roots', 'entity-roots', 'dropdown', '/entity-roots(/create)?');
		Menus.addSubMenuItem('topbar', 'entity-roots', 'List Entity roots', 'entity-roots');
		Menus.addSubMenuItem('topbar', 'entity-roots', 'New Entity root', 'entity-roots/create');
	}
]);