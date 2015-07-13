'use strict';

// Configuring the Articles module
angular.module('goods-received-notes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Goods received notes', 'goods-received-notes', 'dropdown', '/goods-received-notes(/create)?');
		Menus.addSubMenuItem('topbar', 'goods-received-notes', 'List Goods received notes', 'goods-received-notes');
		Menus.addSubMenuItem('topbar', 'goods-received-notes', 'New Goods received note', 'goods-received-notes/create');
	}
]);