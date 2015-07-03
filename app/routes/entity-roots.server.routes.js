'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var entityRoots = require('../../app/controllers/entity-roots.server.controller');

	// Entity roots Routes
	app.route('/entity-roots')
		.get(entityRoots.list)
		.post(users.requiresLogin, entityRoots.create);

	app.route('/entity-roots/:entityRootId')
		.get(entityRoots.read)
		.put(users.requiresLogin, entityRoots.hasAuthorization, entityRoots.update)
		.delete(users.requiresLogin, entityRoots.hasAuthorization, entityRoots.delete);

	// Finish by binding the Entity root middleware
	app.param('entityRootId', entityRoots.entityRootByID);
};
