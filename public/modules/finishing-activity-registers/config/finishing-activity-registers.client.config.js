'use strict';

// Configuring the Articles module
angular.module('finishing-activity-registers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Finishing activity registers', 'finishing-activity-registers', 'dropdown', '/finishing-activity-registers(/create)?');
		Menus.addSubMenuItem('topbar', 'finishing-activity-registers', 'List Finishing activity registers', 'finishing-activity-registers');
		Menus.addSubMenuItem('topbar', 'finishing-activity-registers', 'New Finishing activity register', 'finishing-activity-registers/create');
	}
]);