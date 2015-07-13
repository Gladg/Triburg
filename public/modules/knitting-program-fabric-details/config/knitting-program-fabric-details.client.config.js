'use strict';

// Configuring the Articles module
angular.module('knitting-program-fabric-details').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Knitting program fabric details', 'knitting-program-fabric-details', 'dropdown', '/knitting-program-fabric-details(/create)?');
		Menus.addSubMenuItem('topbar', 'knitting-program-fabric-details', 'List Knitting program fabric details', 'knitting-program-fabric-details');
		Menus.addSubMenuItem('topbar', 'knitting-program-fabric-details', 'New Knitting program fabric detail', 'knitting-program-fabric-details/create');
	}
]);