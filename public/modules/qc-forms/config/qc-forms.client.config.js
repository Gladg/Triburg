'use strict';

// Configuring the Articles module
angular.module('qc-forms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Qc forms', 'qc-forms', 'dropdown', '/qc-forms(/create)?');
		Menus.addSubMenuItem('topbar', 'qc-forms', 'List Qc forms', 'qc-forms');
		Menus.addSubMenuItem('topbar', 'qc-forms', 'New Qc form', 'qc-forms/create');
	}
]);