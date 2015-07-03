'use strict';

// Configuring the Articles module
angular.module('entity-attributes-details').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Entity attributes details', 'entity-attributes-details', 'dropdown', '/entity-attributes-details(/create)?');
		Menus.addSubMenuItem('topbar', 'entity-attributes-details', 'List Entity attributes details', 'entity-attributes-details');
		Menus.addSubMenuItem('topbar', 'entity-attributes-details', 'New Entity attributes detail', 'entity-attributes-details/create');
	}
]);