'use strict';

// Configuring the Articles module
angular.module('resources').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Resources', 'resources', 'dropdown', '/resources(/create)?');
		Menus.addSubMenuItem('topbar', 'resources', 'List Resources', 'resources');
		Menus.addSubMenuItem('topbar', 'resources', 'New Resource', 'resources/create');
	}
]);