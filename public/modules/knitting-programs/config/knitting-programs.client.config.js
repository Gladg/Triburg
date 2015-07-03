'use strict';

// Configuring the Articles module
angular.module('knitting-programs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Knitting programs', 'knitting-programs', 'dropdown', '/knitting-programs(/create)?');
		Menus.addSubMenuItem('topbar', 'knitting-programs', 'List Knitting programs', 'knitting-programs');
		Menus.addSubMenuItem('topbar', 'knitting-programs', 'New Knitting program', 'knitting-programs/create');
	}
]);