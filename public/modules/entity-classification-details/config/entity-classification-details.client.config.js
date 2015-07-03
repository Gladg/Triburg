'use strict';

// Configuring the Articles module
angular.module('entity-classification-details').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Entity classification details', 'entity-classification-details', 'dropdown', '/entity-classification-details(/create)?');
		Menus.addSubMenuItem('topbar', 'entity-classification-details', 'List Entity classification details', 'entity-classification-details');
		Menus.addSubMenuItem('topbar', 'entity-classification-details', 'New Entity classification detail', 'entity-classification-details/create');
	}
]);