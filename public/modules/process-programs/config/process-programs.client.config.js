'use strict';

// Configuring the Articles module
angular.module('process-programs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Process programs', 'process-programs', 'dropdown', '/process-programs(/create)?');
		Menus.addSubMenuItem('topbar', 'process-programs', 'List Process programs', 'process-programs');
		Menus.addSubMenuItem('topbar', 'process-programs', 'New Process program', 'process-programs/create');
	}
]);