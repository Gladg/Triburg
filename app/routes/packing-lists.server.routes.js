'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var packingLists = require('../../app/controllers/packing-lists.server.controller');

	// Packing lists Routes
	app.route('/packing-lists')
		.get(packingLists.list)
		.post(users.requiresLogin, packingLists.create);

	app.route('/packing-lists/:packingListId')
		.get(packingLists.read)
		.put(users.requiresLogin, packingLists.hasAuthorization, packingLists.update)
		.delete(users.requiresLogin, packingLists.hasAuthorization, packingLists.delete);

	// Finish by binding the Packing list middleware
	app.param('packingListId', packingLists.packingListByID);
};
