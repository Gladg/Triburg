'use strict';

// Configuring the Articles module
angular.module('machinery-equipment-lists').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Machinery equipment lists', 'machinery-equipment-lists', 'dropdown', '/machinery-equipment-lists(/create)?');
		Menus.addSubMenuItem('topbar', 'machinery-equipment-lists', 'List Machinery equipment lists', 'machinery-equipment-lists');
		Menus.addSubMenuItem('topbar', 'machinery-equipment-lists', 'New Machinery equipment list', 'machinery-equipment-lists/create');
	}
]);