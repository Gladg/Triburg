'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var entityClassifications = require('../../app/controllers/entity-classifications.server.controller');

	// Entity classifications Routes
	app.route('/entity-classifications')
		.get(entityClassifications.list)
		.post(users.requiresLogin, entityClassifications.create);

	app.route('/entity-classifications/:entityClassificationId')
		.get(entityClassifications.read)
		.put(users.requiresLogin, entityClassifications.hasAuthorization, entityClassifications.update)
		.delete(users.requiresLogin, entityClassifications.hasAuthorization, entityClassifications.delete);

	// Finish by binding the Entity classification middleware
	app.param('entityClassificationId', entityClassifications.entityClassificationByID);
};
